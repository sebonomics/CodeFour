/**
 * STYLE PATTERN DETECTION RULES
 *
 * This file contains all the style pattern detection logic for the AI training system.
 * Each function detects specific types of writing style patterns from user edits.
 *
 * RULE TYPES:
 * - word_replacement: Single word to single word changes
 * - phrase_replacement: Multi-word phrase changes
 * - multi_word_replacement: Word count changes (1→2, 2→1, etc.)
 * - tone_adjustment: Informal to formal language changes
 * - conciseness: Text reduction and redundant word removal
 * - sentence_length_preference: Preference for shorter/longer sentences
 * - voice_change: Specific passive to active voice changes
 * - active_passive_voice: General voice preference patterns
 * - time_format: Time formatting preferences (12hr→24hr, colon usage, etc.)
 * - punctuation_style: Punctuation preferences (Oxford comma, quotes, etc.)
 * - capitalization: Capitalization pattern changes
 * - number_format: Number to word conversions
 * - professional_terminology: Informal to professional term changes
 * - redundant_words: Removal of unnecessary/redundant words
 */

import { diffWords } from "diff"

export interface StyleRule {
  type:
    | "word_replacement"
    | "tone_adjustment"
    | "conciseness"
    | "voice_change"
    | "phrase_replacement"
    | "sentence_structure"
    | "punctuation_style"
    | "capitalization"
    | "number_format"
    | "time_format"
    | "professional_terminology"
    | "multi_word_replacement"
    | "sentence_length_preference"
    | "active_passive_voice"
    | "redundant_words"
  pattern: string
  replacement: string
  frequency: number
  description?: string
  confidence?: number
  reportId?: number
  reportIds?: number[]
}

export interface TextDiff {
  type: "added" | "removed" | "unchanged"
  value: string
}

/**
 * UTILITY: Create word-level diff between original and edited text
 */
export function createDiff(original: string, edited: string): TextDiff[] {
  const wordDiffs = diffWords(original, edited)
  const diffs: TextDiff[] = []

  wordDiffs.forEach((part) => {
    if (part.added) {
      diffs.push({ type: "added", value: part.value })
    } else if (part.removed) {
      diffs.push({ type: "removed", value: part.value })
    } else {
      diffs.push({ type: "unchanged", value: part.value })
    }
  })

  return diffs
}

/**
 * RULE: Word Replacement Detection
 * Detects single word to single word replacements
 * Example: "guy" → "subject", "said" → "stated"
 */
export function detectWordReplacements(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  const diffs = createDiff(original, edited)

  for (let i = 0; i < diffs.length - 1; i++) {
    if (diffs[i].type === "removed" && diffs[i + 1].type === "added") {
      const removedText = diffs[i].value.trim()
      const addedText = diffs[i + 1].value.trim()

      if (!removedText || !addedText) continue

      const removedAlphanumeric = removedText.replace(/[^\w\s]/g, "").trim()
      const addedAlphanumeric = addedText.replace(/[^\w\s]/g, "").trim()

      if (removedAlphanumeric === addedAlphanumeric) continue

      const cleanRemovedText = removedText
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
      const cleanAddedText = addedText
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()

      if (cleanRemovedText === cleanAddedText) continue

      const removedWords = cleanRemovedText.split(/\s+/).filter((w) => w.length > 0)
      const addedWords = cleanAddedText.split(/\s+/).filter((w) => w.length > 0)

      if (removedWords.length >= 1 && addedWords.length >= 1) {
        let ruleType = "word_replacement"
        let description = ""

        if (removedWords.length === 1 && addedWords.length === 1) {
          ruleType = "word_replacement"
          description = `Replace word "${cleanRemovedText}" with "${cleanAddedText}"`
        } else if (removedWords.length === 1 && addedWords.length > 1) {
          ruleType = "phrase_replacement"
          description = `Replace word "${cleanRemovedText}" with phrase "${cleanAddedText}"`
        } else if (removedWords.length > 1 && addedWords.length === 1) {
          ruleType = "phrase_replacement"
          description = `Replace phrase "${cleanRemovedText}" with word "${cleanAddedText}"`
        } else {
          ruleType = "phrase_replacement"
          description = `Replace phrase "${cleanRemovedText}" with phrase "${cleanAddedText}"`
        }

        rules.push({
          type: ruleType as StyleRule["type"],
          pattern: cleanRemovedText,
          replacement: cleanAddedText,
          frequency: 1,
          confidence: 0.9,
          description: description,
        })
      }
    }
  }

  return rules
}

/**
 * RULE: Multi-Word Replacement Detection
 * Specifically tracks when word count changes (1→2, 2→1, etc.)
 * Example: "male subject" → "suspect" (2 words → 1 word)
 */
export function detectMultiWordReplacements(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  const diffs = createDiff(original, edited)

  for (let i = 0; i < diffs.length - 1; i++) {
    if (diffs[i].type === "removed" && diffs[i + 1].type === "added") {
      const removedText = diffs[i].value.trim()
      const addedText = diffs[i + 1].value.trim()

      if (!removedText || !addedText) continue

      const cleanRemovedText = removedText
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
      const cleanAddedText = addedText
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()

      if (cleanRemovedText === cleanAddedText) continue

      const removedWords = cleanRemovedText.split(/\s+/).filter((w) => w.length > 0)
      const addedWords = cleanAddedText.split(/\s+/).filter((w) => w.length > 0)

      // Only track when word count changes significantly
      if (
        (removedWords.length > 1 && addedWords.length === 1) ||
        (removedWords.length === 1 && addedWords.length > 1) ||
        (removedWords.length > 1 && addedWords.length > 1 && removedWords.length !== addedWords.length)
      ) {
        let description = ""
        if (removedWords.length > 1 && addedWords.length === 1) {
          description = `Replace ${removedWords.length} words "${cleanRemovedText}" with 1 word "${cleanAddedText}"`
        } else if (removedWords.length === 1 && addedWords.length > 1) {
          description = `Replace 1 word "${cleanRemovedText}" with ${addedWords.length} words "${cleanAddedText}"`
        } else {
          description = `Replace ${removedWords.length} words "${cleanRemovedText}" with ${addedWords.length} words "${cleanAddedText}"`
        }

        rules.push({
          type: "multi_word_replacement",
          pattern: cleanRemovedText,
          replacement: cleanAddedText,
          frequency: 1,
          confidence: 0.9,
          description: description,
        })
      }
    }
  }

  return rules
}

/**
 * RULE: Tone Adjustment Detection
 * Detects informal to formal language changes and removal of casual modifiers
 * Example: "talked to" → "interviewed", remove "really", "pretty", etc.
 */
export function detectToneAdjustments(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  // Common informal to formal replacements in police reports
  const informalToFormal = [
    { informal: "cops", formal: "officers" },
    { informal: "cop", formal: "officer" },
    { informal: "talked to", formal: "interviewed" },
    { informal: "spoke with", formal: "interviewed" },
    { informal: "guy", formal: "subject" },
    { informal: "guys", formal: "subjects" },
    { informal: "stuff", formal: "items" },
    { informal: "things", formal: "items" },
    { informal: "looked at", formal: "observed" },
    { informal: "checked", formal: "inspected" },
    { informal: "found", formal: "discovered" },
    { informal: "saw", formal: "observed" },
    { informal: "went", formal: "proceeded" },
    { informal: "got", formal: "obtained" },
    { informal: "gave", formal: "provided" },
    { informal: "told", formal: "advised" },
    { informal: "said", formal: "stated" },
    { informal: "asked", formal: "inquired" },
    { informal: "came", formal: "arrived" },
    { informal: "left", formal: "departed" },
    { informal: "walked", formal: "proceeded on foot" },
    { informal: "ran", formal: "fled on foot" },
    { informal: "grabbed", formal: "secured" },
    { informal: "took", formal: "obtained" },
    { informal: "put", formal: "placed" },
    { informal: "showed", formal: "displayed" },
    { informal: "heard", formal: "detected" },
    { informal: "smelled", formal: "detected an odor of" },
    { informal: "felt", formal: "observed" },
  ]

  informalToFormal.forEach(({ informal, formal }) => {
    const informalRegex = new RegExp(`\\b${informal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")
    const formalRegex = new RegExp(`\\b${formal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")

    if (informalRegex.test(original) && formalRegex.test(edited)) {
      rules.push({
        type: "tone_adjustment",
        pattern: informal,
        replacement: formal,
        frequency: 1,
        confidence: 0.9,
        description: `Replace informal "${informal}" with formal "${formal}"`,
      })
    }
  })

  // Detect removal of informal modifiers and filler words
  const informalModifiers = [
    "pretty",
    "really",
    "kinda",
    "sorta",
    "super",
    "totally",
    "basically",
    "like",
    "you know",
    "um",
    "uh",
    "well",
    "so",
    "actually",
    "just",
    "quite",
    "very",
    "extremely",
    "incredibly",
    "absolutely",
    "definitely",
  ]

  const diffs = createDiff(original, edited)

  diffs.forEach((diff) => {
    if (diff.type === "removed") {
      const words = diff.value
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 0)

      words.forEach((word) => {
        if (informalModifiers.includes(word)) {
          rules.push({
            type: "tone_adjustment",
            pattern: word,
            replacement: "",
            frequency: 1,
            confidence: 0.9,
            description: `Remove informal modifier "${word}"`,
          })
        }
      })
    }
  })

  return rules
}

/**
 * RULE: Redundant Words Detection
 * Detects when users consistently remove redundant/unnecessary words
 * Example: Remove "that", "which", redundant phrases like "in order to"
 */
export function detectRedundantWords(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  // Common redundant words and phrases
  const redundantWords = [
    "that",
    "which",
    "who",
    "whom", // Relative pronouns often removable
    "really",
    "very",
    "quite",
    "rather",
    "pretty",
    "fairly", // Intensity modifiers
    "actually",
    "basically",
    "essentially",
    "literally",
    "obviously", // Filler words
    "just",
    "simply",
    "merely",
    "only", // Minimizing words often redundant
  ]

  const redundantPhrases = [
    "in order to",
    "due to the fact that",
    "at this point in time",
    "for the purpose of",
    "with regard to",
    "in the event that",
    "it should be noted that",
    "it is important to note",
    "please be advised",
    "at the present time",
    "in the near future",
    "on a regular basis",
    "in a timely manner",
    "for all intents and purposes",
    "the fact that",
    "in spite of the fact that",
    "owing to the fact that",
    "until such time as",
  ]

  const diffs = createDiff(original, edited)

  diffs.forEach((diff) => {
    if (diff.type === "removed") {
      const removedText = diff.value.toLowerCase().trim()

      // Check for redundant single words
      redundantWords.forEach((word) => {
        const wordRegex = new RegExp(`\\b${word}\\b`, "gi")
        if (wordRegex.test(removedText)) {
          rules.push({
            type: "redundant_words",
            pattern: word,
            replacement: "",
            frequency: 1,
            confidence: 0.8,
            description: `Remove redundant word "${word}"`,
          })
        }
      })

      // Check for redundant phrases
      redundantPhrases.forEach((phrase) => {
        if (removedText.includes(phrase)) {
          rules.push({
            type: "redundant_words",
            pattern: phrase,
            replacement: "",
            frequency: 1,
            confidence: 0.9,
            description: `Remove redundant phrase "${phrase}"`,
          })
        }
      })
    }
  })

  return rules
}

/**
 * RULE: Active/Passive Voice Detection
 * Detects preference for active vs passive voice in writing
 * Example: "was arrested" → "I arrested" (passive to active)
 */
export function detectActivePassiveVoice(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  // Passive voice indicators
  const passiveIndicators = [/\b(was|were|is|are|been|being)\s+\w+ed\b/gi, /\b(was|were|is|are|been|being)\s+\w+en\b/gi]

  const originalPassiveCount = passiveIndicators.reduce((count, regex) => {
    return count + (original.match(regex) || []).length
  }, 0)

  const editedPassiveCount = passiveIndicators.reduce((count, regex) => {
    return count + (edited.match(regex) || []).length
  }, 0)

  // Active voice indicators (subject + action verb)
  const activeIndicators = [
    /\bI\s+(arrested|detained|questioned|searched|transported|interviewed|observed|discovered|found|located|seized|recovered|collected|documented|photographed|processed|booked|charged|cited|released)\b/gi,
    /\b(officers?|police)\s+(arrested|detained|questioned|searched|transported|interviewed|observed|discovered|found|located|seized|recovered|collected|documented|photographed|processed|booked|charged|cited|released)\b/gi,
  ]

  const originalActiveCount = activeIndicators.reduce((count, regex) => {
    return count + (original.match(regex) || []).length
  }, 0)

  const editedActiveCount = activeIndicators.reduce((count, regex) => {
    return count + (edited.match(regex) || []).length
  }, 0)

  // Determine voice preference
  if (originalPassiveCount > editedPassiveCount && editedActiveCount > originalActiveCount) {
    const reduction = originalPassiveCount - editedPassiveCount
    rules.push({
      type: "active_passive_voice",
      pattern: "passive voice",
      replacement: "active voice",
      frequency: reduction,
      confidence: 0.8,
      description: `Prefers active voice - reduced passive constructions by ${reduction}`,
    })
  } else if (originalActiveCount > editedActiveCount && editedPassiveCount > originalPassiveCount) {
    const increase = editedPassiveCount - originalPassiveCount
    rules.push({
      type: "active_passive_voice",
      pattern: "active voice",
      replacement: "passive voice",
      frequency: increase,
      confidence: 0.8,
      description: `Prefers passive voice - increased passive constructions by ${increase}`,
    })
  }

  return rules
}

/**
 * RULE: Time Format Detection
 * Learns user's specific time formatting preferences from their edits
 * Example: "3:30 PM" → "15:30 hours" or "1530 hours" (learns exact style)
 */
export function detectTimeFormatting(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  // Time format patterns
  const timePatterns = {
    "12-hour AM/PM": /\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi,
    "24-hour military colon": /\b(\d{1,2}):(\d{2})\s*hours?\b/gi,
    "24-hour military no-colon": /\b(\d{4})\s*hours?\b/gi,
    "approximate 12-hour": /\bat\s*approximately\s*(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi,
    "approximate 24-hour colon": /\bat\s*approximately\s*(\d{1,2}):(\d{2})\s*hours?\b/gi,
    "approximate 24-hour no-colon": /\bat\s*approximately\s*(\d{4})\s*hours?\b/gi,
  }

  const originalFormats: { [key: string]: RegExpMatchArray[] } = {}
  const editedFormats: { [key: string]: RegExpMatchArray[] } = {}

  // Collect actual matches
  Object.entries(timePatterns).forEach(([formatName, regex]) => {
    originalFormats[formatName] = Array.from(original.matchAll(regex))
    editedFormats[formatName] = Array.from(edited.matchAll(regex))
  })

  // Detect specific format changes
  const original12Hour = originalFormats["12-hour AM/PM"]
  const edited24HourColon = editedFormats["24-hour military colon"]
  const edited24HourNoColon = editedFormats["24-hour military no-colon"]

  if (original12Hour.length > 0 && edited24HourColon.length > 0) {
    rules.push({
      type: "time_format",
      pattern: "12-hour AM/PM format",
      replacement: "24-hour colon format",
      frequency: original12Hour.length,
      confidence: 0.95,
      description: "Convert 12-hour time to 24-hour format with colon (e.g., 3:30 PM → 15:30 hours)",
    })
  }

  if (original12Hour.length > 0 && edited24HourNoColon.length > 0) {
    rules.push({
      type: "time_format",
      pattern: "12-hour AM/PM format",
      replacement: "24-hour no-colon format",
      frequency: original12Hour.length,
      confidence: 0.95,
      description: "Convert 12-hour time to 24-hour format without colon (e.g., 3:30 PM → 1530 hours)",
    })
  }

  // Check for approximate time formatting changes
  const originalApprox12 = originalFormats["approximate 12-hour"]
  const editedApprox24Colon = editedFormats["approximate 24-hour colon"]
  const editedApprox24NoColon = editedFormats["approximate 24-hour no-colon"]

  if (originalApprox12.length > 0 && editedApprox24Colon.length > 0) {
    rules.push({
      type: "time_format",
      pattern: "approximate 12-hour format",
      replacement: "approximate 24-hour colon format",
      frequency: originalApprox12.length,
      confidence: 0.9,
      description:
        "Convert approximate times to 24-hour format with colon (e.g., approximately 3:30 PM → approximately 15:30 hours)",
    })
  }

  if (originalApprox12.length > 0 && editedApprox24NoColon.length > 0) {
    rules.push({
      type: "time_format",
      pattern: "approximate 12-hour format",
      replacement: "approximate 24-hour no-colon format",
      frequency: originalApprox12.length,
      confidence: 0.9,
      description:
        "Convert approximate times to 24-hour format without colon (e.g., approximately 3:30 PM → approximately 1530 hours)",
    })
  }

  return rules
}

/**
 * RULE: Sentence Length Preference Detection
 * Detects if user prefers shorter or longer sentences
 */
export function detectSentenceLengthPreference(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  const originalSentences = original.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const editedSentences = edited.split(/[.!?]+/).filter((s) => s.trim().length > 0)

  const originalAvgLength =
    originalSentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / originalSentences.length
  const editedAvgLength = editedSentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / editedSentences.length

  if (editedAvgLength < originalAvgLength * 0.8) {
    rules.push({
      type: "sentence_length_preference",
      pattern: "long sentences",
      replacement: "short sentences",
      frequency: 1,
      confidence: 0.8,
      description: `Prefers shorter sentences (avg ${originalAvgLength.toFixed(1)} → ${editedAvgLength.toFixed(1)} words)`,
    })
  } else if (editedAvgLength > originalAvgLength * 1.2) {
    rules.push({
      type: "sentence_length_preference",
      pattern: "short sentences",
      replacement: "long sentences",
      frequency: 1,
      confidence: 0.8,
      description: `Prefers longer sentences (avg ${originalAvgLength.toFixed(1)} → ${editedAvgLength.toFixed(1)} words)`,
    })
  }

  return rules
}

/**
 * MASTER FUNCTION: Analyze all style patterns
 * Runs all detection functions and returns consolidated results
 */
export function analyzeAllStylePatterns(original: string, edited: string): StyleRule[] {
  const allRules: StyleRule[] = [
    ...detectWordReplacements(original, edited),
    ...detectMultiWordReplacements(original, edited),
    ...detectToneAdjustments(original, edited),
    ...detectRedundantWords(original, edited),
    ...detectActivePassiveVoice(original, edited),
    ...detectTimeFormatting(original, edited),
    ...detectSentenceLengthPreference(original, edited),
  ]

  return allRules
}
