"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Edit3, Brain, FileText, Zap, ArrowLeft, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { diffWords } from "diff"
import {
  analyzeAllStylePatterns,
  analyzeVoicePreference,
  applyVoicePreference,
  type StyleRule,
  type VoicePreference,
} from "@/lib/style-rules"

interface Report {
  id: number
  title: string
  originalText: string
  editedText: string
  isEdited: boolean
}

interface TextDiff {
  type: "added" | "removed" | "unchanged"
  value: string
}

interface AppliedPattern {
  rule: StyleRule
  applied: boolean
  reason?: string
  foundInText?: boolean
  replacements?: Array<{
    original: string
    replacement: string
    position: number
  }>
}

const sampleReports: Report[] = [
  {
    id: 1,
    title: "#1 - DUI Investigation - Taco Bell Drive-Thru",
    originalText: `I arrived at Taco Bell and started walking toward the drive-thru and was pointed toward a silver 2001 Honda CRV. I approached the vehicle and observed its driver asleep in the driver's seat with the vehicle running. I knocked several times and asked the driver to roll her window down. The driver woke up and appeared confused, and then appeared to wave me off.

I knocked on the driver's window again, asking her to roll the window down. She opened the door. I observed that the vehicle was in neutral and told the driver to place the car in park. I was getting a strong odor of an alcoholic beverage coming from her. I observed the driver's eyes were red, watery, and bloodshot, and her face appeared droopy. She appeared to be having a hard time understanding my instructions. I observed an open case of beer in the back seat and an open beer can in the cup holder adjacent to her. The driver placed her hands on the steering wheel as if she was going to drive away. I reached in, placed the car in park, turned the vehicle off, and dropped the car keys by her feet. The driver's pupils appeared dilated.

I asked the driver what was going on. She said she was trying to go home. I asked her to step outside of the vehicle. She said okay and then tried to shut the door on me. She began trying to start her car without her keys, placing her hands where the keys would be and making a turning motion near the ignition, and then placed her hands on the steering wheel as if to drive away. I told her again to step outside of the vehicle, asking her several times. She said that she was ready, then grabbed her keys and appeared to try to find the key to start the vehicle with. I told the driver that she was under arrest and grabbed her wrist and her right shoulder gently encouraging her outside her vehicle. WSU Sgt. Kurht assisted me in getting her outside of the vehicle. Once the driver was outside the vehicle she became compliant. I placed the driver into handcuffs and checked for a good fit.

WSU Sgt. Kuhrt asked the driver if he could park the car, she said yes. I asked how much she had to drink. She told me "Not much, honestly". When asked why she fell asleep at the wheel at Taco Bell, she said it had been a hectic week with finals and she was tired. When asked about the beer in her cupholder she said it wasn't hers. She then said it was hers from two days ago and then told me it wasn't hers again or something to that effect. I asked the driver if she would be willing to perform some voluntary field sobriety tests to which she agreed. I took the driver out of handcuffs. 

HGN: I observed lack of smooth pursuit in the driver's left and right eyes. She moved her head several times throughout the test. At times she would stop looking at my stimulus, look at me, and look back at the stimulus.

WAT: The driver had issues with balance while in the starting position, and had trouble getting into the starting position. She used her arms for balance while walking and stopped walking during the test. On her 9th step, instead of turning she began walking slowly backwards.

OLS: The driver began walking forward while counting out loud. I stopped her, gave her the instructions again. During the test, Ofc. Emerson had to remind her to lift her foot at least six inches off the ground. Several times during the test she raised her eyes from her foot and look straight ahead. She swayed while balancing.

PBT: I asked the driver if she was willing to provide a breath sample. She agreed. The driver provided a PBT of .249% at approximately 3:09 AM.

It was my opinion that the driver was impaired. I placed her under arrest for DUI and was transported to the Pullman Police Department.`,
    editedText: "",
    isEdited: false,
  },
  {
    id: 2,
    title: "#6 - Football Field Affray - Multiple Subjects",
    originalText: `On November 13, 2021, at approximately 11:48 AM, I was dispatched to the football fields in reference to an affray involving more than 30 people. This was the second time I had been dispatched to the football fields within the hour.

As I was en route, dispatch advised that there was a male subject knocked unconscious. By the time I arrived on scene, everything appeared to be quiet. As I exited my vehicle, I had to ask a female walking with her children if there was an affray going on, because I couldn't tell based on my initial observation.

There were large groups of people hovering around the entire field. She advised that yes, there was a fight, it was all over and that it was further north of my location.

As I was walking, I was flagged down by a male subject who pointed to two male subjects who had just walked past me and advised that they were the instigators to the altercation and that was the reason why they were fleeing. I related this to officer Nathaniel Telles.

I then saw another small group of individuals surrounding one male who was on the ground and that was my victim, Mr. Enrique Aguilera. As I started relaying information to the fire department on where they could make entry into the park since we were right in the middle, I made contact with a female who was standing by Mr. Aguilera, and she was identified as Ms. Theresa Acosta. She was the fiancee of Mr. Aguilera and said that the football game had been finished and her team was the Picacho Middle School football team.

She said that the players had finished the game and then as they were shaking hands with each other they started fighting. The kids started fighting and then the coaches tried to intervene and separate the children. The next thing she knew, parents started jumping in and then the parents started fighting with each other.

Video showed that the two teams had finished playing, and that during the process of shaking each other's hands something was said amongst them. It caught their attention, as they stop moving, and then they start running toward each other. Then, some of the coaches and a few parents try to intervene and separate the children. A number of parents rush into the field and there are piles of people fighting on the ground.

I then spoke to Officer Telles, who had detained the male subject that I had called out initially. He said that they were involved.

As I was standing by with Officer Benoit, David Chaparro came up to me and advised that he was the one who initially started the fight. He said that he was on the Picacho team and was a friend of the head coach, Mr. Enrique Aguilera, who was transported to the hospital. He said that the football game was over and a juvenile male on the Lynn Middle School team, wearing a red jersey with "87" on it, had said something to one of his players and the two started fighting. Then a white male coach from the Lynn team grabbed his player's jersey and was about to punch him when Mr. Chaparro ran over there, threw the coach to the side. The coach then came back and punched him in the face. As soon as the coach had punched him in the face, he grabbed him and pushed him on the ground and the coach took him down to the ground as well, and then the next thing he knew, everybody started fighting one another. After talking with David, I decided to let him go after not being able to discern who the sole instigator. End of case.`,
    editedText: "",
    isEdited: false,
  },
  {
    id: 3,
    title: "#10 - Domestic Disturbance - Apartment Complex",
    originalText: `On August 3, 2020, at approximately 2:54 AM, I responded to a call for a domestic disturbance at a residential complex. Upon my arrival, I observed two officers already on scene speaking with an adult Black male who was standing on the sidewalk. He was identified as the reporting party.

The officers briefed me that the male was in a dispute with his girlfriend, who was currently located inside his apartment and was refusing to leave. I made contact with the male to get a full account of the situation. He explained that his girlfriend was supposed to be staying with him for the entire weekend, but they had an altercation. He said his belief that she may be intoxicated. I asked what his desired outcome was, and he said he wanted officers to make her leave the apartment for the night. I then asked if he would be willing to press any potential criminal charges and act as the victim in the matter, to which he replied, "Yes."

Based on his request, myself and another officer proceeded upstairs to the apartment to make contact with the female. An adult female answered the door. I began by asking about the living situation to determine who was the primary resident. After some questioning, she confirmed that the apartment belonged to the man we had spoken with downstairs. I then informed her that the owner of the apartment was requesting that she vacate the premises for the evening.

The female became uncooperative and said she was not leaving. She began giving numerous reasons why she could not leave, claiming she had personal property such as mail and clothing inside that she needed. She then asserted that she had been residing in the apartment for more than 14 days and, as such, had established legal residency. She argued that we could not lawfully force her to leave without a formal eviction.

Given the female's claim of residency, which turns the matter into a civil issue, I went back downstairs to update the male on the situation. I explained the legal complexities and that we could not physically remove her against her will under these circumstances. After understanding this, the male decided to alter his plan. He said he was going to go inside to grab some of his own things. He proceeded back up to the apartment, entered briefly to collect some belongings, and then exited the building. He then left the premises to de-escalate the situation.

With the primary resident and reporting party having left the scene, the female remained in the apartment. She refused any further communication and would not leave. As there was no further police action that could be taken, and the incident had become a civil matter, all units cleared the scene.`,
    editedText: "",
    isEdited: false,
  },
  {
    id: 4,
    title: "#15 - Structure Fire Investigation - Arson",
    originalText: `On Tuesday, December 21, 2021, at approximately 9:03 AM, I was dispatched to an active structure fire at a multi-story apartment building.

Upon my arrival, I observed visible flames and heavy smoke coming from the windows of a second-story apartment. My first priority was life safety. I began ordering all residents and bystanders to evacuate the premises and move to a safe distance as fire department units began to arrive and attack the blaze.

After the fire department quenched the flames and the danger had passed, I began interviewing witnesses on the scene. My goal was to determine if all occupants were accounted for and to gather any information regarding the potential cause of the fire. During this process, I made contact with an older gentleman wearing a military-style cap, who was watching the scene.

When I asked him what he had witnessed, he made a direct and spontaneous confession, saying, "I lit it." He confirmed that the apartment where the fire originated was his. When I asked for his reasoning, his explanation was confusing and disjointed, saying he did it because "no one else is coming."

The nature of the confession prompted me to speak with my supervisor on scene. I also located the property owner, who confirmed the man, identified as Mr. Hicks, was the resident of the fire-damaged apartment. The owner said that Mr. Hicks's reasoning made no sense. A survey of the building showed that four apartments on the second floor were heavily damaged, leaving many residents displaced.

Given Mr. Hicks's confession, combined with his questionable mental state, the decision was made to place him in protective custody. He was escorted to my patrol vehicle. I then transported him to the hospital for a two-fold purpose: to be assessed for any respiratory damage from smoke inhalation and to undergo a psychological evaluation.

At the hospital, medical staff conducted their assessment and found no abnormal conditions that would warrant an involuntary psychiatric hold. Once Mr. Hicks was medically cleared, probable cause for a criminal act was established based on his on-scene confession to me. I informed him that he was under arrest for arson. He was discharged from the hospital into my custody, and I transported him to the station for formal questioning.`,
    editedText: "",
    isEdited: false,
  },
  {
    id: 5,
    title: "#37 - High-Speed Pursuit - Vehicle Pursuit",
    originalText: `On Saturday, November 9, 2019 at approximately 9:57 PM, I observed a vehicle traveling south at a high rate of speed. I activated my radar unit and locked in a speed of 94 mph in an 55 mph zone. I saw the car slow down. As the vehicle passed my location, I was able to see that it was a black passenger car. I pulled onto the highway and attempted to catch up to the car so that I could initiate a traffic stop. As I accelerated towards the car, I could tell that the car was accelerating and that it was not maintaining a single lane. I initiated my lights and sirens once I realized the car was fleeing.

The car continued south on Highway 79 a short distance and turned west on Columbia Road 64. I pursued the car and advised Hope of the pursuit. The car continued on Columbia 64. As it traveled west, it drove between two vehicles parked on opposite sides of the roadway. The car then turned north onto Columbia Road 111. I saw an opportunity to end the pursuit and rammed the car with the front of my car. The ram was unsuccessful in stopping the car and it continued north. Columbia 111 is a gravel road and the car continued at a high rate of speed and was able to create distance between us. I was able to follow the dust cloud left by the car. It continued north on Columbia 111 until it turned north west onto Ouachita 1.

The car then traveled into Nevada county. While following the dust trail, I regained visual of the car while on Nevada 179. The car had slowed considerably as I caught up to it. I lost visual as the car rounded a curve, as I rounded the curve I could see the car had stopped in the roadway. The driver's door was open as well as the passenger's. I could see feet hanging out of the passenger door as I stopped my vehicle.

I exited my unit and ordered the passenger not to move. The female passenger followed commands and was taken into custody. The female was identified as Harlie Colvin. I asked her who was driving and if he had a weapon. She advised me that Broderick Colvin was the driver and that he did not have a weapon. She said that he fled into the woods to the left of the car and that he was fleeing because he had warrants.

I asked her how long she had known Broderick Colvin. She told me that this was their first night of being alone together. Once other units arrived we searched for the suspect but were unsuccessful in finding him. A search of the vehicle was conducted. There was a Marlin .22 Rifle located between the driver's seat and the center console that the female said belonged to the driver. A knife was also found in the edge of the woods. Both the gun and the knife were seized.

I returned to Colvin and asked her why her and the suspect had the same last name. She told me she was married to the suspect. I stopped her and advised her of her Miranda Rights. I told her that she had lied to me and that she was facing hindering and obstruction charges. She told me that the driver was RJ Hughey, Ronnie Damaria Hughey, Jr. Colvin said that he told her not to identify him. I confirmed his identity through photograph. Harlie Colvin then wrote out a statement and signed that statement advising who the driver was. Harlie Colvin was released with the vehicle and charges could be pending.`,
    editedText: "",
    isEdited: false,
  },
]

const testReport = {
  id: 6,
  title: "Robbery Investigation - La Quinta Hotel",
  originalText: `On March 6, 2021, at approximately 12:33 p.m., while on uniform patrol for the Las Cruces Police Department, I was dispatched to 790 Avenida de Mesilla at the La Quinta in reference to a possible robbery. Dispatch was advising that they were approached by a customer and that a male pulled out a gun and tried to rob him. They advised that the customer in the lobby was wearing a jacket, black pants, and a black hat. The male left the scene running to the next building on the east side of the property.

As I was arriving on scene, I came in contact with the reporting party, Rick Boy, and another guy. I was attempting to get information as to whether the possible suspect and victim had left. As I was speaking to Mr. Boy in the front parking lot near the front doorway, a male subject ran out of the annex building which was just to the east and ran toward the north end of the property and turned running eastbound. That is when Mr. Boy told me that was the male subject we were looking for. At first, it was unclear as to whether the identified party was the victim or the suspect. I provided that information to other units who were arriving on scene. There were able to detain several male subjects who matched the description of a blue jean jacket, black pants, and a black hat, possibly a Hispanic male last seen heading east from the north end of the annex building.

Later, it was determined that it was possibly the victim of the incident who initially came over to Mr. Boy, saying that he had been robbed.

After talking to several employees, we went over and cleared two rooms in the annex building, one of which officer Brian Klimeck (L797) had contact with a male subject who later was found to have some warrants and possible narcotics on him. See officer Brian Klimeck's (L797) report for further information. There were also several electronic items such as phones and other things in that room itself. From there, I went over to get more information from the employees who were on scene. They said that there were two males, one wearing a black shirt with black shorts and the other male wearing a jean jacket and a black hat with the black pants.

They said that they had seen them walking and that they were on the west corridor inside near the Northern portion of that corridor checking rooms. They said that they had seen those two males walking and asked if they needed help. They said that the male in the Black was his brother and they were just having a slight disagreement. He said that the males had walked upstairs and that is when they heard possible running and one male ran down and came back toward the employees and said that he had been robbed by the other male subject but they did not see where the other male subject had gone or if he had come downstairs and left.

The victim said that the male pulled out a firearm and robbed him and took his money. He said that he did not see the suspect after that occurred and said that he went over to make contact with the front desk so they could contact law enforcement. Shortly thereafter, the victim had left the scene. They said that while I was there gathering information, the girlfriend of the male subject where the parties possibly came from had a ride. The room was in her name: Valerie Valles.

I gathered Ms. Valles' information and asked her what had occurred. When I ran her information, dispatch said she had warrants for her arrest. Ms. Valles was arrested and transported, first to Mesilla Valley Regional Dispatch Authority to pick up the warrants, then to the detention center.

No other details. No other information.`,
}

// Proper diff implementation using diff library
function createDiff(original: string, edited: string): TextDiff[] {
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

function detectWordReplacements(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  const diffs = createDiff(original, edited)

  // Look for removed word followed by added word (replacement pattern)
  for (let i = 0; i < diffs.length - 1; i++) {
    if (diffs[i].type === "removed" && diffs[i + 1].type === "added") {
      const removedText = diffs[i].value.trim()
      const addedText = diffs[i + 1].value.trim()

      // Skip if empty or just whitespace
      if (!removedText || !addedText) continue

      // Skip if it's just punctuation changes
      const removedAlphanumeric = removedText.replace(/[^\w\s]/g, "").trim()
      const addedAlphanumeric = addedText.replace(/[^\w\s]/g, "").trim()

      if (removedAlphanumeric === addedAlphanumeric) continue

      // Clean the text of punctuation for comparison
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

      // Skip if the text is the same after cleaning punctuation
      if (cleanRemovedText === cleanAddedText) continue

      const removedWords = cleanRemovedText.split(/\s+/).filter((w) => w.length > 0)
      const addedWords = cleanAddedText.split(/\s+/).filter((w) => w.length > 0)

      // Only single word to single word replacements
      if (removedWords.length === 1 && addedWords.length === 1) {
        rules.push({
          type: "word_replacement",
          pattern: cleanRemovedText,
          replacement: cleanAddedText,
          frequency: 1,
          confidence: 0.9,
          description: `Replace word "${cleanRemovedText}" with "${cleanAddedText}"`,
        })
      }
      // Phrase replacements (multi-word to single word, single word to multi-word, or multi-word to multi-word)
      else if (removedWords.length >= 1 && addedWords.length >= 1) {
        rules.push({
          type: "phrase_replacement",
          pattern: cleanRemovedText,
          replacement: cleanAddedText,
          frequency: 1,
          confidence: 0.8,
          description: `Replace phrase "${cleanRemovedText}" with "${cleanAddedText}"`,
        })
      }
    }
  }

  return rules
}

function detectToneAdjustments(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  // Enhanced informal to formal replacements
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
    { informal: "saw", formal: "observed" },
    { informal: "went", formal: "proceeded" },
    { informal: "got", formal: "obtained" },
    { informal: "gave", formal: "provided" },
    { informal: "told", formal: "advised" },
    { informal: "said", formal: "stated" },
    { informal: "asked", formal: "inquired" },
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

  return rules
}

function detectTimeFormatting(original: string, edited: string): StyleRule[] {
  const rules: StyleRule[] = []
  if (original.trim() === edited.trim()) return rules

  // Detect various time format patterns
  const timePatterns = {
    "12-hour AM/PM": /\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi,
    "24-hour military": /\b(\d{4})\s*hours?\b/gi,
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
  const edited24Hour = editedFormats["24-hour military"]

  if (original12Hour.length > 0 && edited24Hour.length > 0) {
    rules.push({
      type: "time_format",
      pattern: "12-hour AM/PM format",
      replacement: "24-hour military format",
      frequency: original12Hour.length,
      confidence: 0.95,
      description: "Convert 12-hour time to 24-hour military format (e.g., 3:30 PM → 1530 hours)",
    })
  }

  return rules
}

// Visual diff component for displaying changes
interface VisualDiffProps {
  original: string
  edited: string
  title: string
}

function VisualDiff({ original, edited, title }: VisualDiffProps) {
  const diffs = createDiff(original, edited)

  return (
    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded text-white/80 text-sm h-64 overflow-y-auto">
      <h5 className="font-medium mb-2 text-green-400">{title}</h5>
      <div className="leading-relaxed">
        {diffs.map((diff, index) => {
          if (diff.type === "unchanged") {
            return <span key={index}>{diff.value}</span>
          } else if (diff.type === "removed") {
            return (
              <span key={index} className="bg-red-500/20 text-red-300 line-through" title="Removed text">
                {diff.value}
              </span>
            )
          } else if (diff.type === "added") {
            return (
              <span key={index} className="bg-green-500/20 text-green-300 font-bold" title="Added text">
                {diff.value}
              </span>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default function TrainingPage() {
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>(sampleReports)
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [isTrainingComplete, setIsTrainingComplete] = useState(false)
  const [styleRules, setStyleRules] = useState<StyleRule[]>([])
  const [voicePreference, setVoicePreference] = useState<VoicePreference | null>(null)
  const [suggestedEdits, setSuggestedEdits] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [intensityLevel, setIntensityLevel] = useState<number[]>([50])
  const [appliedPatterns, setAppliedPatterns] = useState<AppliedPattern[]>([])

  const editedReportsCount = reports.filter((r) => r.isEdited).length

  const handleReportEdit = (reportId: number, newText: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, editedText: newText, isEdited: newText.trim() !== "" } : report,
      ),
    )

    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport((prev) => (prev ? { ...prev, editedText: newText, isEdited: newText.trim() !== "" } : null))
    }
  }

  const analyzeEdits = async () => {
    setIsTraining(true)
    console.log("🚀 Starting AI training process...")
    console.log(`📊 Training with ${editedReportsCount} edited reports`)

    const bannedWords = [
      "a",
      "an",
      "the",
      "to",
      "from",
      "of",
      "by",
      "for",
      "on",
      "at",
      "in",
      "with",
      "and",
      "but",
      "or",
      "so",
      "if",
      "because",
      "than",
      "as",
      "is",
      "was",
      "are",
      "be",
      "been",
      "being",
      "has",
      "have",
      "had",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "can",
      "do",
      "does",
      "did",
      "this",
      "that",
      "these",
      "those",
      "it",
      "its",
      "he",
      "she",
      "him",
      "her",
      "his",
      "hers",
      "they",
      "them",
      "their",
      "theirs",
      "we",
      "us",
      "our",
      "ours",
      "you",
      "your",
      "yours",
      "i",
      "me",
      "my",
      "mine",
    ]

    console.log("🧠 Starting with enhanced pattern detection...")
    const allRules: StyleRule[] = []

    // ✅ Phase 1: Analyze voice preference first
    try {
      const editedReports = reports.filter((r) => r.isEdited)
      const voicePref = await analyzeVoicePreference(editedReports)
      setVoicePreference(voicePref)
      console.log("✅ Voice preference analysis complete")
    } catch (error) {
      console.warn("Error analyzing voice preference:", error)
    }

    // Then analyze other patterns
    for (let index = 0; index < reports.length; index++) {
      const report = reports[index]
      if (report.isEdited && report.editedText && report.editedText.trim() !== report.originalText.trim()) {
        console.log(`📝 Analyzing report ${index + 1}: ${report.title}`)

        // Use all the detection functions
        const wordRules = detectWordReplacements(report.originalText, report.editedText)
        const toneRules = detectToneAdjustments(report.originalText, report.editedText)
        const timeRules = detectTimeFormatting(report.originalText, report.editedText)

        try {
          const reportRules = await analyzeAllStylePatterns(report.originalText, report.editedText)
          const allReportRules = [...wordRules, ...toneRules, ...timeRules, ...reportRules]

          allReportRules.forEach((rule) => {
            rule.reportId = report.id
          })

          console.log(`  └─ Found ${allReportRules.length} patterns in this report`)
          allRules.push(...allReportRules)
        } catch (error) {
          console.warn(`Error analyzing patterns for report ${index + 1}:`, error)
          // Continue with other reports even if one fails
          const allReportRules = [...wordRules, ...toneRules, ...timeRules]
          allRules.push(...allReportRules)
        }
      }
    }

    // Filter out patterns with banned words and group by signature
    const filteredRules = allRules.filter((rule) => {
      const patternWords = rule.pattern.toLowerCase().split(/\s+/)
      const replacementWords = rule.replacement.toLowerCase().split(/\s+/)
      const hasBannedPattern = patternWords.some((word) => bannedWords.includes(word))
      const hasBannedReplacement = replacementWords.some((word) => bannedWords.includes(word))
      return !hasBannedPattern && !hasBannedReplacement
    })

    const patternMap = new Map<string, StyleRule[]>()
    filteredRules.forEach((rule) => {
      const signature = `${rule.type}:${rule.pattern.toLowerCase()}:${rule.replacement.toLowerCase()}`
      if (!patternMap.has(signature)) {
        patternMap.set(signature, [])
      }
      patternMap.get(signature)!.push(rule)
    })

    const validPatterns: StyleRule[] = []
    patternMap.forEach((rules, signature) => {
      // A pattern must occur at least twice (within one report or across multiple reports)
      if (rules.length >= 2) {
        const uniqueReports = new Set(rules.map((r) => r.reportId))
        const confidence = uniqueReports.size >= 2 ? 1.0 : 0.9
        let description = rules[0].description || ""

        if (uniqueReports.size === 1) {
          description += ` (appears ${rules.length} times in 1 report)`
        } else {
          description += ` (appears in ${uniqueReports.size} reports, ${rules.length} times total)`
        }

        const consolidatedRule: StyleRule = {
          type: rules[0].type,
          pattern: rules[0].pattern,
          replacement: rules[0].replacement,
          frequency: rules.length,
          confidence: confidence,
          description: description,
          reportIds: Array.from(uniqueReports),
          regex: rules[0].regex,
        }

        validPatterns.push(consolidatedRule)
      }
    })

    setTimeout(() => {
      setStyleRules(validPatterns)
      setIsTraining(false)
      setIsTrainingComplete(true)
      setActiveTab("patterns")
      console.log("✅ Training complete!")
      console.log(`Found ${validPatterns.length} valid patterns that occur at least twice`)
    }, 2000)
  }

  const applySupervisorStyle = async () => {
    console.log("🎨 Applying learned style to test report...")

    if (styleRules.length === 0 && !voicePreference) {
      setSuggestedEdits(testReport.originalText)
      setShowSuggestions(true)
      setAppliedPatterns([])
      return
    }

    const intensity = intensityLevel[0] / 100
    let editedText = testReport.originalText
    const originalText = testReport.originalText

    // Track what patterns were actually found and applied
    const patternsUsed: AppliedPattern[] = []

    // Determine which types of changes to apply based on intensity level
    const shouldApplyWordChanges = intensity >= 0.2  // 20% - word-for-word changes
    const shouldApplyPhraseChanges = intensity >= 0.4  // 40% - phrase replacements
    const shouldApplyVoiceChanges = intensity >= 0.7  // 70% - active/passive voice
    const shouldApplyToneChanges = intensity >= 0.5  // 50% - tone adjustments
    const shouldApplyTimeChanges = intensity >= 0.3  // 30% - time formatting

    console.log(`🎛️ Intensity Level: ${intensityLevel[0]}%`)
    console.log(`  Word changes: ${shouldApplyWordChanges ? '✓' : '✗'}`)
    console.log(`  Phrase changes: ${shouldApplyPhraseChanges ? '✓' : '✗'}`)
    console.log(`  Voice changes: ${shouldApplyVoiceChanges ? '✓' : '✗'}`)
    console.log(`  Tone changes: ${shouldApplyToneChanges ? '✓' : '✗'}`)
    console.log(`  Time changes: ${shouldApplyTimeChanges ? '✓' : '✗'}`)

    // ✅ Phase 2: Apply voice preference first if available and intensity allows
    if (voicePreference && voicePreference.confidence > 0.3 && shouldApplyVoiceChanges) {
      try {
        const beforeVoice = editedText
        editedText = await applyVoicePreference(editedText, voicePreference)

        // Check if voice preference actually made changes
        const voiceChangesDetected = beforeVoice !== editedText

        if (voiceChangesDetected) {
          patternsUsed.push({
            rule: {
              type: voicePreference.preference === "active" ? "passive_to_active" : "active_to_passive",
              pattern: `${voicePreference.preference === "active" ? "passive" : "active"} voice constructions`,
              replacement: `${voicePreference.preference} voice constructions`,
              frequency: voicePreference.passiveToActiveCount + voicePreference.activeToPassiveCount,
              confidence: voicePreference.confidence,
              description: `Apply ${voicePreference.preference} voice preference (${Math.round(voicePreference.confidence * 100)}% confidence)`,
            },
            applied: true,
            foundInText: true,
            reason: "Voice patterns detected and converted in test report",
          })
        }

        console.log("✅ Voice preference applied")
      } catch (error) {
        console.warn("Error applying voice preference:", error)
      }
    }

    // Then apply other style patterns and track which ones actually found matches
    if (styleRules.length > 0) {
      styleRules.forEach((rule) => {
        const beforeApplication = editedText

        // Check if this rule type should be applied based on intensity
        let shouldApplyThisRule = false
        switch (rule.type) {
          case "word_replacement":
            shouldApplyThisRule = shouldApplyWordChanges
            break
          case "phrase_replacement":
          case "multi_word_phrase":
            shouldApplyThisRule = shouldApplyPhraseChanges
            break
          case "passive_to_active":
          case "active_to_passive":
            shouldApplyThisRule = shouldApplyVoiceChanges
            break
          case "tone_adjustment":
            shouldApplyThisRule = shouldApplyToneChanges
            break
          case "time_format":
            shouldApplyThisRule = shouldApplyTimeChanges
            break
          default:
            shouldApplyThisRule = shouldApplyWordChanges // Default to word changes
        }

        if (!shouldApplyThisRule) {
          console.log(`⏭️ Skipping ${rule.type} due to intensity level`)
          return
        }

        // Check if the pattern exists in the current text
        let patternFound = false
        const replacements: Array<{ original: string; replacement: string; position: number }> = []

        // Create regex for pattern matching
        const regex = new RegExp(`\\b${rule.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")
        const matches = Array.from(editedText.matchAll(regex))

        if (matches.length > 0) {
          patternFound = true
          matches.forEach((match) => {
            replacements.push({
              original: match[0],
              replacement: rule.replacement,
              position: match.index || 0,
            })
          })
        }

        // Apply the pattern if confidence meets intensity threshold AND pattern was found
        if (patternFound && (rule.confidence || 0) >= intensity) {
          // Apply the actual replacement
          editedText = editedText.replace(regex, rule.replacement)

          // Only add to applied patterns if it was actually found and applied
          patternsUsed.push({
            rule,
            applied: true,
            foundInText: true,
            replacements,
            reason: `Found ${replacements.length} instance(s) of "${rule.pattern}" in test report`,
          })
        }
      })
    }

    setSuggestedEdits(editedText)
    setShowSuggestions(true)
    setAppliedPatterns(patternsUsed)
    console.log("🎉 Style application complete!")
    console.log(`Applied ${patternsUsed.length} patterns that were found in the test report`)
  }

  // Group patterns by type for better display, including voice preference
  const groupedPatterns = styleRules.reduce(
    (acc, rule) => {
      if (!acc[rule.type]) {
        acc[rule.type] = []
      }
      acc[rule.type].push(rule)
      return acc
    },
    {} as Record<string, StyleRule[]>,
  )

  // Add voice preference to grouped patterns if it exists
  if (voicePreference && voicePreference.confidence > 0.3) {
    const voiceType = voicePreference.preference === "active" ? "passive_to_active" : "active_to_passive"
    if (!groupedPatterns[voiceType]) {
      groupedPatterns[voiceType] = []
    }

    // Create a style rule representation of the voice preference
    const voiceRule: StyleRule = {
      type: voiceType,
      pattern: `${voicePreference.preference === "active" ? "passive" : "active"} voice constructions`,
      replacement: `${voicePreference.preference} voice constructions`,
      frequency: voicePreference.passiveToActiveCount + voicePreference.activeToPassiveCount,
      confidence: voicePreference.confidence,
      description: `Convert to ${voicePreference.preference} voice (${voicePreference.passiveToActiveCount + voicePreference.activeToPassiveCount} changes detected across ${voicePreference.totalSentencesAnalyzed} sentences)`,
    }

    // Add to the beginning of the array to show it prominently
    groupedPatterns[voiceType].unshift(voiceRule)
  }

  return (
    <div className="min-h-screen bg-black text-white font-geist">
      <div className="p-6">
        <Button onClick={() => router.push("/")} variant="ghost" className="text-white hover:bg-white/10 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Progress Overview */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Training Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80">Reports Edited: {editedReportsCount}/5</span>
                <Badge variant={editedReportsCount >= 2 ? "default" : "secondary"}>
                  {editedReportsCount >= 2 ? "Ready to Train" : "In Progress"}
                </Badge>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(editedReportsCount / 5) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="edit" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Reports
              </TabsTrigger>
              <TabsTrigger value="patterns" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Brain className="w-4 h-4 mr-2" />
                Patterns
              </TabsTrigger>
              <TabsTrigger value="test" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Zap className="w-4 h-4 mr-2" />
                Test Style
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Report List */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Sample Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedReport?.id === report.id
                            ? "border-white bg-white/10"
                            : "border-white/20 bg-white/5 hover:bg-white/10"
                        }`}
                        onClick={() => setSelectedReport(report)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium">{report.title}</h3>
                          <div className="flex items-center gap-2">
                            {selectedReport?.id === report.id && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  console.log(`📋 Copying original text for report: ${report.title}`)
                                  handleReportEdit(report.id, report.originalText)
                                }}
                              >
                                Copy Original
                              </Button>
                            )}
                            {report.isEdited && <CheckCircle className="w-5 h-5 text-green-400" />}
                          </div>
                        </div>
                        <p className="text-white/60 text-sm mt-1">{report.originalText.substring(0, 100)}...</p>
                      </div>
                    ))}

                    {/* Train Button */}
                    {editedReportsCount >= 2 && !isTrainingComplete && (
                      <div className="pt-4 border-t border-white/10">
                        <Button
                          onClick={analyzeEdits}
                          disabled={isTraining}
                          className="w-full bg-white text-black hover:bg-gray-200"
                        >
                          {isTraining ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                              Training AI...
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 mr-2" />
                              Train AI
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Editor */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {selectedReport ? `Edit: ${selectedReport.title}` : "Select a Report to Edit"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedReport ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/80 text-sm block mb-2">Original Text:</label>
                          <div className="bg-white/10 p-3 rounded border text-white/70 text-sm max-h-32 overflow-y-auto">
                            {selectedReport.originalText}
                          </div>
                        </div>
                        <div>
                          <label className="text-white/80 text-sm block mb-2">Your Edited Version:</label>
                          <textarea
                            className="w-full h-48 p-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
                            placeholder="Edit the report to match your preferred style..."
                            value={selectedReport.editedText}
                            onChange={(e) => handleReportEdit(selectedReport.id, e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-white/60 py-12">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a report from the list to begin editing</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Learned Style Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isTrainingComplete ? (
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 mx-auto mb-4 text-white/40" />
                      <h3 className="text-white text-lg mb-2">No Patterns Yet</h3>
                      <p className="text-white/60">Complete the training process to see learned patterns</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Summary Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white/10 border-white/20">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Brain className="w-5 h-5 text-white/80" />
                              <div>
                                <p className="text-white font-medium">
                                  {styleRules.length + (voicePreference && voicePreference.confidence > 0.3 ? 1 : 0)}
                                </p>
                                <p className="text-white/60 text-sm">Total Patterns</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-white/80" />
                              <div>
                                <p className="text-white font-medium">
                                  {styleRules.length > 0 || (voicePreference && voicePreference.confidence > 0.3)
                                    ? Math.round(
                                        ((styleRules.reduce((acc, rule) => acc + (rule.confidence || 0), 0) +
                                          (voicePreference && voicePreference.confidence > 0.3
                                            ? voicePreference.confidence
                                            : 0)) /
                                          (styleRules.length +
                                            (voicePreference && voicePreference.confidence > 0.3 ? 1 : 0))) *
                                          100,
                                      )
                                    : 0}
                                  %
                                </p>
                                <p className="text-white/60 text-sm">Avg Confidence</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-white/20">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-white/80" />
                              <div>
                                <p className="text-white font-medium">{Object.keys(groupedPatterns).length}</p>
                                <p className="text-white/60 text-sm">Pattern Types</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Pattern Groups */}
                      {Object.keys(groupedPatterns).length === 0 ? (
                        <div className="text-center py-12">
                          <Brain className="w-16 h-16 mx-auto mb-4 text-white/40" />
                          <h3 className="text-white text-lg mb-2">No Patterns Detected</h3>
                          <p className="text-white/60">
                            Patterns must occur at least twice to be detected. Try making similar edits across multiple
                            reports.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {Object.entries(groupedPatterns).map(([type, patterns]) => (
                            <Card key={type} className="bg-white/10 border-white/20">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-white text-sm">
                                  {type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} ({patterns.length})
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {patterns.map((pattern, index) => (
                                    <div key={index} className="bg-white/5 p-3 rounded border border-white/10">
                                      <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                                          {pattern.confidence && `${Math.round(pattern.confidence * 100)}% confidence`}
                                        </Badge>
                                        {pattern.frequency > 1 && (
                                          <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                                            {pattern.frequency}x
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm">
                                          <span className="text-red-300 font-mono bg-red-500/20 px-2 py-1 rounded">
                                            {pattern.pattern}
                                          </span>
                                          <span className="text-white/60">→</span>
                                          <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">
                                            {pattern.replacement}
                                          </span>
                                        </div>
                                        {pattern.description && (
                                          <p className="text-white/60 text-xs">{pattern.description}</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Test Learned Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isTrainingComplete ? (
                    <div className="text-center py-12">
                      <Zap className="w-16 h-16 mx-auto mb-4 text-white/40" />
                      <h3 className="text-white text-lg mb-2">Training Required</h3>
                      <p className="text-white/60">Complete the training process before testing the AI</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Intensity Control */}
                      <Card className="bg-white/10 border-white/20">
                        <CardHeader>
                          <CardTitle className="text-white text-sm flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Style Application Intensity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-white/80 text-sm">Intensity Level:</span>
                              <span className="text-white font-medium">{intensityLevel[0]}%</span>
                            </div>
                            <Slider
                              value={intensityLevel}
                              onValueChange={setIntensityLevel}
                              max={100}
                              min={0}
                              step={10}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Conservative</span>
                              <span>Aggressive</span>
                            </div>
                            <p className="text-white/60 text-xs">
                              <strong>Intensity Levels:</strong><br/>
                              20%+: Word-for-word changes<br/>
                              30%+: Time formatting<br/>
                              40%+: Phrase replacements<br/>
                              50%+: Tone adjustments<br/>
                              70%+: Active/passive voice changes
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-medium mb-3">New Report (Unedited):</h4>
                          <div className="bg-white/10 p-4 rounded border text-white/80 text-sm h-64 overflow-y-auto">
                            <h5 className="font-medium mb-2">{testReport.title}</h5>
                            {testReport.originalText}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-3">AI Suggestions:</h4>
                          {showSuggestions ? (
                            <VisualDiff
                              original={testReport.originalText}
                              edited={suggestedEdits}
                              title={`${testReport.title} (AI Edited)`}
                            />
                          ) : (
                            <div className="bg-white/5 p-4 rounded border-2 border-dashed border-white/20 h-64 flex items-center justify-center">
                              <p className="text-white/40 text-center">
                                Click "Apply Learned Style" to see AI suggestions
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Apply Learned Style Button - Spans both columns */}
                      <Button
                        onClick={applySupervisorStyle}
                        className="w-full bg-white text-black hover:bg-gray-200"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Apply Learned Style
                      </Button>

                      {/* Applied Patterns Section - Only show patterns that were actually found in the test report */}
                      {showSuggestions && appliedPatterns.filter((p) => p.applied && p.foundInText).length > 0 && (
                        <Card className="bg-white/10 border-white/20">
                          <CardHeader>
                            <CardTitle className="text-white text-sm flex items-center gap-2">
                              <Brain className="w-4 h-4" />
                              Patterns Found and Applied in Test Report
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {appliedPatterns
                                .filter((pattern) => pattern.applied && pattern.foundInText)
                                .map((appliedPattern, index) => (
                                  <div key={index} className="bg-white/5 p-3 rounded border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                      <Badge variant="outline" className="text-xs border-white/20 text-green-300">
                                        ✓ Found & Applied
                                      </Badge>
                                      <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                                        {appliedPattern.rule.type.replace(/_/g, " ")}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-red-300 font-mono bg-red-500/20 px-2 py-1 rounded">
                                          {appliedPattern.rule.pattern}
                                        </span>
                                        <span className="text-white/60">→</span>
                                        <span className="text-green-300 font-mono bg-green-500/20 px-2 py-1 rounded">
                                          {appliedPattern.rule.replacement}
                                        </span>
                                      </div>
                                      {appliedPattern.reason && (
                                        <p className="text-white/60 text-xs">{appliedPattern.reason}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
