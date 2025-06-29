// Initialize WinkNLP with English model
let nlp: any = null

// Lazy initialization to avoid issues during build
const initializeWinkNLP = async () => {
  if (!nlp) {
    try {
      // Use dynamic import to avoid SSR issues
      const winkNLPModule = await import("wink-nlp")
      const model = await import("wink-eng-lite-web-model")
      nlp = winkNLPModule.default(model.default)
    } catch (error) {
      console.warn("WinkNLP initialization failed, falling back to regex-based detection:", error)
      return null
    }
  }
  return nlp
}

interface PhraseChange {
  from: string
  to: string
  confidence: number
  similarity: number
}

interface PhraseFrequency {
  from: string
  to: string
  count: number
  confidence: number
}

// Store phrase frequencies across multiple comparisons
const phraseFrequencyMap = new Map<string, PhraseFrequency>()

/**
 * Extract key multi-word phrases from text using WinkNLP
 */
export async function extractKeyPhrases(text: string): Promise<string[]> {
  const winkNLP = await initializeWinkNLP()

  if (!winkNLP) {
    // Fallback to regex-based extraction if WinkNLP fails
    return extractPhrasesWithRegex(text)
  }

  try {
    const doc = winkNLP.readDoc(text)
    const phrases: string[] = []

    // Extract noun phrases
    doc.entities().each((entity: any) => {
      const phrase = entity.out().toLowerCase().trim()
      if (phrase.split(" ").length >= 2) {
        // Multi-word only
        phrases.push(phrase)
      }
    })

    // Extract multi-word sequences with relevant POS tags
    const tokens = doc.tokens()
    const tokenArray: any[] = []

    tokens.each((token: any) => {
      tokenArray.push({
        text: token.out(),
        pos: token.out(winkNLP.its.pos),
        lemma: token.out(winkNLP.its.lemma),
      })
    })

    // Look for multi-word patterns: ADJ+NOUN, NOUN+NOUN, VERB+NOUN, etc.
    for (let i = 0; i < tokenArray.length - 1; i++) {
      const current = tokenArray[i]
      const next = tokenArray[i + 1]

      // Skip if either token is punctuation or common words
      if (isCommonWord(current.text) || isCommonWord(next.text)) continue
      if (current.pos === "PUNCT" || next.pos === "PUNCT") continue

      // Extract meaningful multi-word combinations
      const relevantPatterns = [
        ["ADJ", "NOUN"],
        ["NOUN", "NOUN"],
        ["VERB", "NOUN"],
        ["VERB", "ADV"],
        ["ADV", "VERB"],
        ["NOUN", "VERB"],
      ]

      const currentPattern = [current.pos, next.pos]
      const isRelevantPattern = relevantPatterns.some(
        (pattern) => pattern[0] === currentPattern[0] && pattern[1] === currentPattern[1],
      )

      if (isRelevantPattern) {
        const phrase = `${current.text} ${next.text}`.toLowerCase().trim()
        if (phrase.length > 3 && !phrases.includes(phrase)) {
          phrases.push(phrase)
        }
      }

      // Look for 3-word phrases as well
      if (i < tokenArray.length - 2) {
        const third = tokenArray[i + 2]
        if (!isCommonWord(third.text) && third.pos !== "PUNCT") {
          const threePhrasePatterns = [
            ["ADJ", "ADJ", "NOUN"],
            ["ADJ", "NOUN", "NOUN"],
            ["VERB", "ADV", "ADV"],
            ["VERB", "PREP", "NOUN"],
          ]

          const threePattern = [current.pos, next.pos, third.pos]
          const isRelevantThreePattern = threePhrasePatterns.some(
            (pattern) =>
              pattern[0] === threePattern[0] && pattern[1] === threePattern[1] && pattern[2] === threePattern[2],
          )

          if (isRelevantThreePattern) {
            const phrase = `${current.text} ${next.text} ${third.text}`.toLowerCase().trim()
            if (phrase.length > 5 && !phrases.includes(phrase)) {
              phrases.push(phrase)
            }
          }
        }
      }
    }

    return [...new Set(phrases)] // Remove duplicates
  } catch (error) {
    console.warn("Error extracting phrases with WinkNLP, falling back to regex:", error)
    return extractPhrasesWithRegex(text)
  }
}

/**
 * Fallback regex-based phrase extraction
 */
function extractPhrasesWithRegex(text: string): string[] {
  const phrases: string[] = []
  const cleanText = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = cleanText.split(" ").filter((word) => word.length > 0 && !isCommonWord(word))

  // Extract 2-word and 3-word phrases
  for (let i = 0; i < words.length - 1; i++) {
    // 2-word phrases
    const twoWordPhrase = `${words[i]} ${words[i + 1]}`
    if (twoWordPhrase.length > 3) {
      phrases.push(twoWordPhrase)
    }

    // 3-word phrases
    if (i < words.length - 2) {
      const threeWordPhrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`
      if (threeWordPhrase.length > 5) {
        phrases.push(threeWordPhrase)
      }
    }
  }

  return [...new Set(phrases)]
}

/**
 * Check if a word is too common to be meaningful
 */
function isCommonWord(word: string): boolean {
  const commonWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "up",
    "about",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "between",
    "among",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "can",
    "must",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
    "very",
    "really",
    "quite",
    "just",
    "only",
    "also",
    "too",
    "so",
    "then",
    "now",
    "here",
    "there",
    "where",
    "when",
    "why",
    "how",
    "what",
    "which",
    "who",
    "whom",
    "whose",
    "if",
    "unless",
    "until",
    "while",
    "although",
    "though",
    "because",
    "since",
    "as",
    "than",
    "like",
    "unlike",
  ])

  return commonWords.has(word.toLowerCase()) || word.length <= 2
}

/**
 * Calculate similarity between two phrases using word overlap and Levenshtein distance
 */
function calculatePhraseSimilarity(phrase1: string, phrase2: string): number {
  const words1 = phrase1
    .toLowerCase()
    .split(" ")
    .filter((w) => !isCommonWord(w))
  const words2 = phrase2
    .toLowerCase()
    .split(" ")
    .filter((w) => !isCommonWord(w))

  // If either phrase has no meaningful words, similarity is 0
  if (words1.length === 0 || words2.length === 0) return 0

  // Calculate word overlap
  const commonWords = words1.filter((word) => words2.includes(word))
  const wordOverlap = commonWords.length / Math.max(words1.length, words2.length)

  // Calculate Levenshtein distance for the full phrases
  const levDistance = levenshteinDistance(phrase1, phrase2)
  const maxLength = Math.max(phrase1.length, phrase2.length)
  const levSimilarity = maxLength > 0 ? 1 - levDistance / maxLength : 0

  // Combine both metrics (weighted towards word overlap for phrase matching)
  return wordOverlap * 0.7 + levSimilarity * 0.3
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator, // substitution
      )
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Detect phrase changes between original and edited text
 */
export async function detectPhraseChanges(original: string, edited: string): Promise<PhraseChange[]> {
  try {
    const originalPhrases = await extractKeyPhrases(original)
    const editedPhrases = await extractKeyPhrases(edited)

    const changes: PhraseChange[] = []
    const confidenceThreshold = 0.3 // Minimum confidence for a match
    const maxSimilarity = 0.8 // Maximum similarity (too similar means it's likely the same phrase)

    // Find phrases that were removed from original
    const removedPhrases = originalPhrases.filter((phrase) => !editedPhrases.includes(phrase))

    // Find phrases that were added in edited
    const addedPhrases = editedPhrases.filter((phrase) => !originalPhrases.includes(phrase))

    // Match removed phrases with added phrases based on similarity
    for (const removedPhrase of removedPhrases) {
      let bestMatch: { phrase: string; similarity: number; confidence: number } | null = null

      for (const addedPhrase of addedPhrases) {
        const similarity = calculatePhraseSimilarity(removedPhrase, addedPhrase)

        // Skip if phrases are too similar (likely the same) or too different
        if (similarity > maxSimilarity || similarity < confidenceThreshold) continue

        // Calculate confidence based on context and phrase quality
        let confidence = similarity

        // Boost confidence for common police report transformations
        if (isLikelyPoliceReportTransformation(removedPhrase, addedPhrase)) {
          confidence = Math.min(confidence + 0.2, 1.0)
        }

        // Prefer shorter, more specific replacements
        if (addedPhrase.split(" ").length < removedPhrase.split(" ").length) {
          confidence = Math.min(confidence + 0.1, 1.0)
        }

        if (!bestMatch || confidence > bestMatch.confidence) {
          bestMatch = { phrase: addedPhrase, similarity, confidence }
        }
      }

      if (bestMatch && bestMatch.confidence >= confidenceThreshold) {
        changes.push({
          from: removedPhrase,
          to: bestMatch.phrase,
          confidence: bestMatch.confidence,
          similarity: bestMatch.similarity,
        })

        // Track frequency for this phrase pair
        const pairKey = `${removedPhrase}→${bestMatch.phrase}`
        if (phraseFrequencyMap.has(pairKey)) {
          const existing = phraseFrequencyMap.get(pairKey)!
          existing.count++
          existing.confidence = Math.min(existing.confidence + 0.1, 1.0)
        } else {
          phraseFrequencyMap.set(pairKey, {
            from: removedPhrase,
            to: bestMatch.phrase,
            count: 1,
            confidence: bestMatch.confidence,
          })
        }

        // Remove the matched phrase so it can't be matched again
        const addedIndex = addedPhrases.indexOf(bestMatch.phrase)
        if (addedIndex > -1) {
          addedPhrases.splice(addedIndex, 1)
        }
      }
    }

    return changes.filter((change) => change.confidence >= confidenceThreshold)
  } catch (error) {
    console.warn("Error detecting phrase changes:", error)
    return []
  }
}

/**
 * Check if a phrase transformation is likely a police report style change
 */
function isLikelyPoliceReportTransformation(from: string, to: string): boolean {
  const commonTransformations = [
    { from: /male\s+suspect/i, to: /subject/i },
    { from: /female\s+suspect/i, to: /subject/i },
    { from: /got\s+there/i, to: /arrived/i },
    { from: /went\s+to/i, to: /proceeded\s+to/i },
    { from: /talked\s+to/i, to: /interviewed/i },
    { from: /spoke\s+with/i, to: /interviewed/i },
    { from: /looked\s+at/i, to: /observed/i },
    { from: /saw\s+the/i, to: /observed\s+the/i },
    { from: /told\s+me/i, to: /advised\s+me/i },
    { from: /said\s+that/i, to: /stated\s+that/i },
    { from: /asked\s+him/i, to: /inquired/i },
    { from: /gave\s+me/i, to: /provided/i },
    { from: /got\s+out/i, to: /exited/i },
  ]

  return commonTransformations.some((transformation) => transformation.from.test(from) && transformation.to.test(to))
}

/**
 * Get frequently occurring phrase changes across multiple comparisons
 */
export function getFrequentPhraseChanges(minFrequency = 2): PhraseFrequency[] {
  return Array.from(phraseFrequencyMap.values())
    .filter((phrase) => phrase.count >= minFrequency)
    .sort((a, b) => b.count - a.count)
}

/**
 * Clear the phrase frequency tracking (useful for testing or reset)
 */
export function clearPhraseFrequency(): void {
  phraseFrequencyMap.clear()
}

/**
 * Example usage function for testing
 */
export async function testPhraseDetection(): Promise<void> {
  const original = "I observed a male suspect near the alley. The guy was acting suspicious and I talked to him."
  const edited = "I observed the subject near the alley. The individual was acting suspicious and I interviewed him."

  console.log("Testing phrase detection...")
  const result = await detectPhraseChanges(original, edited)
  console.log("Detected changes:", result)

  const frequent = getFrequentPhraseChanges(1)
  console.log("Frequent phrase changes:", frequent)
}
