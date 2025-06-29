import { diffWords } from "diff"
import { detectPhraseChanges } from "./wink-phrase-detector"

export interface StyleRule {
  type:
    | "passive_to_active"
    | "active_to_passive"
    | "tone_adjustment"
    | "phrase_replacement"
    | "multi_word_phrase"
    | "time_format"
    | "conciseness"
    | "word_replacement"
  pattern: string
  replacement: string
  frequency: number
  confidence: number
  description: string
  reportId?: number
  reportIds?: number[]
  regex?: string
}

export interface VoicePreference {
  preference: "active" | "passive"
  confidence: number
  passiveToActiveCount: number
  activeToPassiveCount: number
  totalSentencesAnalyzed: number
}

// Predefined informal words to check for tone adjustments
const INFORMAL_WORDS = [
  { informal: "cops", formal: "officers" },
  { informal: "guy", formal: "individual" },
  { informal: "guys", formal: "individuals" },
  { informal: "asked", formal: "inquired" },
  { informal: "said", formal: "stated" },
  { informal: "told", formal: "advised" },
  { informal: "pretty", formal: "" },
  { informal: "kinda", formal: "somewhat" },
  { informal: "sorta", formal: "somewhat" },
  { informal: "really", formal: "" },
  { informal: "very", formal: "" },
  { informal: "actually", formal: "" },
  { informal: "just", formal: "" },
  { informal: "looked at", formal: "observed" },
  { informal: "saw", formal: "observed" },
  { informal: "went", formal: "proceeded" },
  { informal: "got", formal: "obtained" },
  { informal: "gave", formal: "provided" },
]

/**
 * Enhanced passive voice detection using multiple pattern matching approaches
 * This provides better accuracy than simple regex matching
 */
function isPassiveVoice(sentence: string): boolean {
  // Convert to lowercase for analysis
  const text = sentence.toLowerCase()

  // Common passive voice patterns in police reports
  const passivePatterns = [
    // "was/were + past participle" patterns
    /\b(was|were)\s+\w*ed\b/,
    /\b(was|were)\s+\w*en\b/,
    /\b(was|were)\s+(arrested|transported|observed|found|taken|given|told|asked|advised|dispatched|called|sent|placed|removed|detained|released|charged|cited|warned|searched|questioned|interviewed|contacted|located|identified|processed|booked|fingerprinted|photographed)\b/,

    // "is/are + being + past participle" patterns
    /\b(is|are)\s+being\s+\w*ed\b/,
    /\b(is|are)\s+being\s+\w*en\b/,

    // "has/have been + past participle" patterns
    /\b(has|have)\s+been\s+\w*ed\b/,
    /\b(has|have)\s+been\s+\w*en\b/,

    // Common police report passive constructions
    /\bwas\s+(arrested|transported|observed|found|taken|given|told|asked|advised|dispatched|called|sent|placed|removed|detained|released|charged|cited|warned|searched|questioned|interviewed|contacted|located|identified|processed|booked|fingerprinted|photographed)\b/,
    /\bwere\s+(arrested|transported|observed|found|taken|given|told|asked|advised|dispatched|called|sent|placed|removed|detained|released|charged|cited|warned|searched|questioned|interviewed|contacted|located|identified|processed|booked|fingerprinted|photographed)\b/,
  ]

  // Check if any passive pattern matches
  return passivePatterns.some((pattern) => pattern.test(text))
}

/**
 * Split text into sentences using multiple delimiters
 */
function splitIntoSentences(text: string): string[] {
  // Split on sentence endings, but preserve the delimiter
  const sentences = text.split(/([.!?]+)/).filter((s) => s.trim().length > 0)

  // Recombine sentences with their punctuation
  const result: string[] = []
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i]?.trim()
    const punctuation = sentences[i + 1] || ""
    if (sentence) {
      result.push((sentence + punctuation).trim())
    }
  }

  return result.filter((s) => s.length > 10) // Filter out very short fragments
}

/**
 * ✅ Phase 1: Detect Voice Preference using enhanced pattern matching
 */
async function detectVoicePreference(originalTexts: string[], editedTexts: string[]): Promise<VoicePreference> {
  let passiveToActiveCount = 0
  let activeToPassiveCount = 0
  let totalSentencesAnalyzed = 0

  console.log("🔍 Phase 1: Analyzing voice preference across all reports...")

  for (let i = 0; i < originalTexts.length; i++) {
    const original = originalTexts[i]
    const edited = editedTexts[i]

    if (!edited || edited.trim() === original.trim()) continue

    try {
      // Split into sentences
      const originalSentences = splitIntoSentences(original)
      const editedSentences = splitIntoSentences(edited)

      // Compare corresponding sentences for voice changes
      const maxLength = Math.min(originalSentences.length, editedSentences.length)

      for (let j = 0; j < maxLength; j++) {
        const origSentence = originalSentences[j]
        const editSentence = editedSentences[j]

        // Skip if sentences are too similar (likely no voice change)
        if (origSentence.toLowerCase().trim() === editSentence.toLowerCase().trim()) continue

        totalSentencesAnalyzed++

        const originalIsPassive = isPassiveVoice(origSentence)
        const editedIsPassive = isPassiveVoice(editSentence)

        if (originalIsPassive && !editedIsPassive) {
          passiveToActiveCount++
          console.log(
            `  📝 Passive→Active: "${origSentence.substring(0, 50)}..." → "${editSentence.substring(0, 50)}..."`,
          )
        } else if (!originalIsPassive && editedIsPassive) {
          activeToPassiveCount++
          console.log(
            `  📝 Active→Passive: "${origSentence.substring(0, 50)}..." → "${editSentence.substring(0, 50)}..."`,
          )
        }
      }
    } catch (error) {
      console.warn("Error processing sentences:", error)
    }
  }

  const preference = passiveToActiveCount > activeToPassiveCount ? "active" : "passive"
  const totalChanges = passiveToActiveCount + activeToPassiveCount
  const confidence = totalChanges > 0 ? Math.abs(passiveToActiveCount - activeToPassiveCount) / totalChanges : 0

  console.log(`✅ Voice Preference Analysis Complete:`)
  console.log(`   Passive→Active changes: ${passiveToActiveCount}`)
  console.log(`   Active→Passive changes: ${activeToPassiveCount}`)
  console.log(`   Total sentences analyzed: ${totalSentencesAnalyzed}`)
  console.log(`   Supervisor prefers: ${preference.toUpperCase()} voice`)
  console.log(`   Confidence: ${Math.round(confidence * 100)}%`)

  return {
    preference,
    confidence,
    passiveToActiveCount,
    activeToPassiveCount,
    totalSentencesAnalyzed,
  }
}

async function detectPassiveToActive(original: string, edited: string): Promise<StyleRule[]> {
  const rules: StyleRule[] = []

  try {
    let originalPassiveCount = 0
    let editedPassiveCount = 0

    const originalSentences = splitIntoSentences(original)
    const editedSentences = splitIntoSentences(edited)

    for (const sentence of originalSentences) {
      if (isPassiveVoice(sentence)) originalPassiveCount++
    }

    for (const sentence of editedSentences) {
      if (isPassiveVoice(sentence)) editedPassiveCount++
    }

    // If passive voice was reduced in editing, it's a pattern
    if (originalPassiveCount > editedPassiveCount) {
      rules.push({
        type: "passive_to_active",
        pattern: "passive voice constructions",
        replacement: "active voice constructions",
        frequency: originalPassiveCount - editedPassiveCount,
        confidence: 0.9,
        description: `Converts passive voice to active voice (${originalPassiveCount} → ${editedPassiveCount} passive constructions)`,
      })
    } else if (editedPassiveCount > originalPassiveCount) {
      rules.push({
        type: "active_to_passive",
        pattern: "active voice constructions",
        replacement: "passive voice constructions",
        frequency: editedPassiveCount - originalPassiveCount,
        confidence: 0.9,
        description: `Converts active voice to passive voice (${originalPassiveCount} → ${editedPassiveCount} passive constructions)`,
      })
    }
  } catch (error) {
    console.warn("Error in detectPassiveToActive:", error)
  }

  return rules
}

/**
 * ✅ NEW: Detect multi-word phrase replacements using WinkNLP
 */
async function detectMultiWordPhrases(original: string, edited: string): Promise<StyleRule[]> {
  const rules: StyleRule[] = []

  try {
    console.log("🔍 Analyzing multi-word phrase changes with WinkNLP...")
    const phraseChanges = await detectPhraseChanges(original, edited)

    for (const change of phraseChanges) {
      // Only include high-confidence multi-word phrase changes
      if (change.confidence >= 0.5 && change.from.split(" ").length >= 2) {
        rules.push({
          type: "multi_word_phrase",
          pattern: change.from,
          replacement: change.to,
          frequency: 1,
          confidence: change.confidence,
          description: `Replace multi-word phrase "${change.from}" with "${change.to}" (${Math.round(change.confidence * 100)}% confidence)`,
        })
      }
    }

    console.log(`  └─ Found ${rules.length} multi-word phrase patterns`)
  } catch (error) {
    console.warn("Error detecting multi-word phrases:", error)
  }

  return rules
}

function detectToneAdjustments(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []

  INFORMAL_WORDS.forEach(({ informal, formal }) => {
    const informalRegex = new RegExp(`\\b${informal}\\b`, "gi")
    const formalRegex = formal ? new RegExp(`\\b${formal}\\b`, "gi") : null

    const originalMatches = original.match(informalRegex)
    const editedInformalMatches = edited.match(informalRegex)
    const editedFormalMatches = formalRegex ? edited.match(formalRegex) : null

    // Check if informal word was replaced with formal word or removed
    const originalCount = originalMatches ? originalMatches.length : 0
    const editedInformalCount = editedInformalMatches ? editedInformalMatches.length : 0
    const editedFormalCount = editedFormalMatches ? editedFormalMatches.length : 0

    if (originalCount > editedInformalCount) {
      const replacementText = formal || "[removed]"
      rules.push({
        type: "tone_adjustment",
        pattern: informal,
        replacement: replacementText,
        frequency: originalCount - editedInformalCount,
        confidence: 0.85,
        description: `Replace informal "${informal}" with ${formal ? `formal "${formal}"` : "removal"}`,
      })
    }
  })

  return rules
}

function detectPhraseReplacements(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  const diffs = diffWords(original, edited)

  // Look for removed/added pairs that could be phrase replacements
  for (let i = 0; i < diffs.length - 1; i++) {
    if (diffs[i].removed && diffs[i + 1].added) {
      const removedText = diffs[i].value.trim()
      const addedText = diffs[i + 1].value.trim()

      // Skip single character changes or whitespace-only changes
      if (removedText.length <= 1 || addedText.length <= 1) continue
      if (!removedText || !addedText) continue

      // Clean the text for comparison
      const cleanRemoved = removedText
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
      const cleanAdded = addedText
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()

      // Skip if they're the same after cleaning
      if (cleanRemoved === cleanAdded) continue

      const removedWords = cleanRemoved.split(/\s+/).filter((w) => w.length > 0)
      const addedWords = cleanAdded.split(/\s+/).filter((w) => w.length > 0)

      // Only consider multi-word phrases or significant single word changes
      if (
        removedWords.length >= 2 ||
        addedWords.length >= 2 ||
        (removedWords.length === 1 && addedWords.length === 1 && removedWords[0].length > 3 && addedWords[0].length > 3)
      ) {
        rules.push({
          type: "phrase_replacement",
          pattern: cleanRemoved,
          replacement: cleanAdded,
          frequency: 1,
          confidence: 0.8,
          description: `Replace phrase "${cleanRemoved}" with "${cleanAdded}"`,
        })
      }
    }
  }

  return rules
}

function detectTimeFormatting(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []

  // Check for 12-hour to 24-hour time format changes
  const twelveHourPattern = /\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi
  const twentyFourHourPattern = /\b(\d{4})\s*hours?\b/gi

  const originalTwelveHour = original.match(twelveHourPattern)
  const editedTwentyFourHour = edited.match(twentyFourHourPattern)

  if (originalTwelveHour && editedTwentyFourHour) {
    rules.push({
      type: "time_format",
      pattern: "12-hour AM/PM format",
      replacement: "24-hour military format",
      frequency: Math.min(originalTwelveHour.length, editedTwentyFourHour.length),
      confidence: 0.95,
      description: "Convert 12-hour time to 24-hour military format",
    })
  }

  return rules
}

function detectConciseness(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []

  const originalWordCount = original.split(/\s+/).length
  const editedWordCount = edited.split(/\s+/).length

  if (editedWordCount < originalWordCount * 0.9) {
    // Significant reduction in word count
    const reduction = originalWordCount - editedWordCount
    const percentage = Math.round(((originalWordCount - editedWordCount) / originalWordCount) * 100)

    rules.push({
      type: "conciseness",
      pattern: "verbose phrasing",
      replacement: "concise phrasing",
      frequency: reduction,
      confidence: 0.7,
      description: `Reduce word count by ${percentage}% (${originalWordCount} → ${editedWordCount} words)`,
    })
  }

  return rules
}

export async function analyzeAllStylePatterns(original: string, edited: string): Promise<StyleRule[]> {
  const allRules: StyleRule[] = []

  try {
    // Apply all detection functions (some async, some sync)
    const passiveRules = await detectPassiveToActive(original, edited)
    allRules.push(...passiveRules)

    // ✅ NEW: Add multi-word phrase detection using WinkNLP
    const multiWordRules = await detectMultiWordPhrases(original, edited)
    allRules.push(...multiWordRules)

    allRules.push(...detectToneAdjustments(original, edited))
    allRules.push(...detectPhraseReplacements(original, edited))
    allRules.push(...detectTimeFormatting(original, edited))
    allRules.push(...detectConciseness(original, edited))
  } catch (error) {
    console.warn("Error in analyzeAllStylePatterns:", error)
  }

  return allRules
}

/**
 * ✅ Phase 1: Analyze voice preference across all edited reports
 */
export async function analyzeVoicePreference(
  reports: Array<{ originalText: string; editedText: string; isEdited: boolean }>,
): Promise<VoicePreference> {
  const originalTexts = reports.filter((r) => r.isEdited).map((r) => r.originalText)
  const editedTexts = reports.filter((r) => r.isEdited).map((r) => r.editedText)

  return await detectVoicePreference(originalTexts, editedTexts)
}

/**
 * ✅ Phase 2: Apply learned voice preference to new text
 */
export async function applyVoicePreference(text: string, voicePreference: VoicePreference): Promise<string> {
  if (voicePreference.confidence < 0.3) {
    console.log("⚠️ Low confidence in voice preference, skipping voice corrections")
    return text
  }

  console.log(`🎨 Phase 2: Applying ${voicePreference.preference} voice preference to new text...`)

  try {
    let result = text
    const sentences = splitIntoSentences(text)

    for (const sentenceText of sentences) {
      const isPassive = isPassiveVoice(sentenceText)

      // Apply corrections based on learned preference
      if (voicePreference.preference === "active" && isPassive) {
        console.log(`  🔄 Converting passive to active: "${sentenceText.substring(0, 50)}..."`)

        // Simple passive to active transformations
        let corrected = sentenceText
        corrected = corrected.replace(/\bwas arrested by (.+?)\b/gi, "$1 arrested")
        corrected = corrected.replace(/\bwere arrested by (.+?)\b/gi, "$1 arrested")
        corrected = corrected.replace(/\bwas transported by (.+?)\b/gi, "$1 transported")
        corrected = corrected.replace(/\bwere transported by (.+?)\b/gi, "$1 transported")
        corrected = corrected.replace(/\bwas observed by (.+?)\b/gi, "$1 observed")
        corrected = corrected.replace(/\bwere observed by (.+?)\b/gi, "$1 observed")

        // Simple cases without explicit agent
        corrected = corrected.replace(/\bwas arrested\b/gi, "I arrested")
        corrected = corrected.replace(/\bwere arrested\b/gi, "officers arrested")
        corrected = corrected.replace(/\bwas transported\b/gi, "I transported")
        corrected = corrected.replace(/\bwere transported\b/gi, "officers transported")
        corrected = corrected.replace(/\bwas dispatched\b/gi, "dispatch sent me")
        corrected = corrected.replace(/\bwas observed\b/gi, "I observed")

        result = result.replace(sentenceText, corrected)
      } else if (voicePreference.preference === "passive" && !isPassive) {
        console.log(`  🔄 Converting active to passive: "${sentenceText.substring(0, 50)}..."`)

        // Simple active to passive transformations
        let corrected = sentenceText
        corrected = corrected.replace(/\bI arrested (.+?)\b/gi, "$1 was arrested")
        corrected = corrected.replace(/\bofficers arrested (.+?)\b/gi, "$1 were arrested")
        corrected = corrected.replace(/\bI transported (.+?)\b/gi, "$1 was transported")
        corrected = corrected.replace(/\bofficers transported (.+?)\b/gi, "$1 were transported")
        corrected = corrected.replace(/\bI observed (.+?)\b/gi, "$1 was observed")
        corrected = corrected.replace(/\bofficers observed (.+?)\b/gi, "$1 were observed")

        result = result.replace(sentenceText, corrected)
      }
    }

    return result
  } catch (error) {
    console.warn("Error applying voice preference:", error)
    return text
  }
}

export function applyStylePatterns(text: string, rules: StyleRule[], intensity = 1.0): string {
  let editedText = text

  rules.forEach((rule) => {
    // Apply rule based on confidence and intensity
    const shouldApply = (rule.confidence || 0) * intensity > 0.5

    if (shouldApply) {
      switch (rule.type) {
        case "tone_adjustment":
          if (rule.replacement !== "[removed]") {
            const regex = new RegExp(`\\b${rule.pattern}\\b`, "gi")
            editedText = editedText.replace(regex, rule.replacement)
          } else {
            // Remove the word entirely
            const regex = new RegExp(`\\b${rule.pattern}\\b\\s*`, "gi")
            editedText = editedText.replace(regex, "")
          }
          break

        case "phrase_replacement":
        case "word_replacement":
        case "multi_word_phrase": // ✅ NEW: Handle multi-word phrase replacements
          const regex = new RegExp(rule.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
          editedText = editedText.replace(regex, rule.replacement)
          break

        case "passive_to_active":
          // Apply specific passive to active transformations
          editedText = editedText.replace(/\bwas arrested\b/gi, "I arrested")
          editedText = editedText.replace(/\bwere arrested\b/gi, "officers arrested")
          editedText = editedText.replace(/\bwas transported\b/gi, "I transported")
          editedText = editedText.replace(/\bwere transported\b/gi, "officers transported")
          editedText = editedText.replace(/\bwas observed\b/gi, "I observed")
          editedText = editedText.replace(/\bwere observed\b/gi, "officers observed")
          break

        case "active_to_passive":
          // Apply active to passive transformations
          editedText = editedText.replace(/\bI arrested (.+?)\b/gi, "$1 was arrested")
          editedText = editedText.replace(/\bofficers arrested (.+?)\b/gi, "$1 were arrested")
          editedText = editedText.replace(/\bI transported (.+?)\b/gi, "$1 was transported")
          editedText = editedText.replace(/\bofficers transported (.+?)\b/gi, "$1 were transported")
          break

        case "time_format":
          // Convert 12-hour to 24-hour format
          editedText = editedText.replace(/\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi, (match, hour, minute, period) => {
            let hour24 = Number.parseInt(hour)
            if (period.toUpperCase() === "PM" && hour24 !== 12) {
              hour24 += 12
            } else if (period.toUpperCase() === "AM" && hour24 === 12) {
              hour24 = 0
            }
            return `${hour24.toString().padStart(2, "0")}${minute} hours`
          })
          break
      }
    }
  })

  return editedText
}
