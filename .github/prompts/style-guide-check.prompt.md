You are making changes to some documentation to adhere to the following style guide.

Important:
- DO NOT change any special formatting or .rST formatting.
- DO NOT hallucinate or add new information.
- You can fix any typos or grammatical errors.
- Add line breaks to the content at 72 characters.

Once complete, list every change and its new line number in a bulleted list.

Here is the style guide:

# Use Active Voice
Active voice makes the performer the subject, while passive voice makes the recipient the subject.
Active voice is more engaging, less complicated, less wordy, and easier to understand.
Clarifies user actions vs. technology actions.
Examples:
Active: "Restart the service."
Passive: "The service can be restarted."
## When Do You Use Passive Voice?
Use passive voice to avoid blaming the user.
Use when active voice is wordy or awkward.
Use to emphasize the object over the performer.
Examples:
Passive: "The flag was set incorrectly."
Active: "You set the flag incorrectly."
# Use Present Tense
Use present tense for user actions: it's engaging and easier to read.
Use past tense for historical events or previous software releases.
Use future tense sparingly to avoid uncertainty.
Examples:
Present: "The product prompts you."
Future: "The product will prompt you."
# Use Second Person and Imperative Mood
## Write to the User
Use second person (you) to address the user directly for a friendly tone.
Use imperative mood for instructions to eliminate wordiness and confusion.
Avoid gender-specific pronouns; use gender-neutral ones.
Use first-person plural pronouns (we, our) judiciously.
Limit the use of first-person singular pronoun (I).
Avoid switching person in the same document.
Examples:
Use: "Click Yes to accept the license agreement."
Avoid: "The license agreement is accepted when the user clicks Yes."
# Avoid the Subjunctive Mood
Avoid words expressing doubt or uncertainty (should, could, would).
Aim for authoritative documentation.
Examples:
Use: "The logs download as a .CSV file."
Avoid: "The logs should download as a .CSV file."
# Write Clear and Concise Sentences and Paragraphs
## Use a Consistent Sentence Structure
Stick to subject-verb-object structure.
Use simple sentences for clarity.
Ensure conditional clauses are at the sentence start.
Examples:
Use: "Atlas truncates the value when stored as an integer."
Avoid: "Only when stored in an integer variable is the value truncated."
## Restrict Sentence Length
Limit sentences to 20-25 words.
Use multiple clauses if a longer sentence is needed.
Examples:
Use: "Atlas fetches a list of regions and displays the default tier."
Avoid: "Atlas fetches a list of regions, along with the cluster tier..."
### Limit Using Be as the Main Verb
Find and use action verbs instead of forms of be.
Examples:
Use: "This report analyzes the problem."
Avoid: "This report is an analysis of the problem."
### Avoid Expletive Structures
Rewrite sentences starting with It or There.
Examples:
Use: "We need to solve this problem."
Avoid: "It is necessary for us to find a solution to this problem."
### Avoid Nominalizations
Convert nouns derived from verbs back into verbs.
Examples:
Use: "The modal recommends upgrading."
Avoid: "The modal contains a recommendation to upgrade."
# Use the Necessary Words
Only use words necessary to convey the meaning.
Remove extraneous words like unnecessary adverbs, adjectives, and prepositional phrases.
Include necessary articles and syntactic cues.
Examples:
Use: "Use the product to create URLs."
Avoid: "A great feature implemented by the product is the ability to generate URLs."
# Create Short Paragraphs
Keep paragraphs to one idea and four to five sentences.
Avoid one-sentence paragraphs.
Use bullet lists for three or more items.
Examples:
Use: "- Run a generated script immediately."
Avoid: "From the Job Scheduler, run a script, schedule it, track jobs…"
## Create Effective Lists
Introduce a list with a contextual sentence, and end the sentence with a
colon.
Don't specify the number of items in the list in the introduction. 
Avoid using a fragment to introduce a list.
Use the following guidelines when writing list items:

-  Capitalize the first letter of each list item unless the first
   letter must be lowercase.
-  Make all list items parallel grammatically. For example, all items
   start with fragments, or all items use sentences.
-  Use the following guidelines for punctuation in lists:

   -  In a list of only sentences, including imperative statements, use
      punctuation at the end of each list item.
   -  In a list of only fragments, do not use punctuation at the end of
      any of the list items.
   -  In a list of fragments, some or all of which are followed by
      sentences, use punctuation at the end of every list item.

-  Don't connect separate list items with commas or conjunctions
   (*and*, *or*).

-  Avoid using articles (*a*, *an*, *the*) to start list items.
# Use Effective Verbs
## Use Action-Oriented Verbs
Replace weak verbs and gerunds with strong, action-oriented verbs.
Examples:
Use: "MongoDB leads the industry."
Avoid: "MongoDB is the industry leader."
## Avoid Nouns Built from Verbs
Use verbs instead of nouns derived from them.
Examples:
Use: "The following table describes the products."
Avoid: "The following table provides a description of the products."
## Use the Simplest Tense
Prefer simple verbs over complex ones.
Examples:
Use: "Complete the prerequisites."
Avoid: "You should have completed the prerequisites."
## Use Modal Verbs Accurately
Use can, may, might, must, and should accurately.
Examples:
Can: "You can customize Atlas clusters."
Should: "To avoid loss, renew claims periodically."
## Use Single-Word Verbs
Use single-word verbs over phrasal verbs.
Examples:
Use: "Determine the type of encryption."
Avoid: "Figure out the type of encryption."
## Don't Use Verbs as Nouns or Adjectives
Use correct parts of speech.
Examples:
Use: "After installation, configure the product."
Avoid: "When you complete the install, configure the product."
## Don't Use Non-Verbs as Verbs
Avoid turning non-verbs into verbs.
Examples:
Use: "Verify the change using the ping command."
Avoid: "Verify the change by pinging the server."
## Use Transitive Verbs Transitively, not Intransitively
Ensure verbs that require direct objects are used correctly.
Examples:
Use: "The product displays the servers."
Avoid: "The servers display."
## Use Correct Plurality Agreements
Match verbs with the correct plurality of their subjects.
Examples:
Use: "A group of things is available."
Avoid: "A group of things are available."
## Don't Humanize Inanimate Objects
Avoid ascribing human traits to inanimate objects.
Examples:
Use: "The software stores your profile."
Avoid: "The software remembers your profile."
# Clarify Gerunds and Participles
Ensure gerunds and participles are clearly understood in sentences.
Examples:
Use: "A job includes metadata that schedules the program."
Avoid: "A job includes scheduling metadata for the program."
# Clarify Ambiguous Modifiers
## Misplaced Modifiers
Place modifiers near the words they modify.
Examples:
Use: "The method creates an index if one doesn't exist."
Avoid: "The method only creates an index if an index doesn't exist."
## Dangling Modifiers
Ensure modifier clauses modify the right subject.
Examples:
Use: "Your clusters are displayed when you log in."
Avoid: "Logging in, your clusters display."
# Use that, which, and such as Correctly
Use that for restrictive clauses; no commas.
Use which for nonrestrictive clauses; with commas.
Such as without comma for restrictive, with comma for nonrestrictive.
Examples:
Use: "Enter the username and password that you just created."
Avoid: "Enter the username and password you just created."
# Clarify Pronouns and Antecedents
Ensure pronouns clearly refer to their antecedents.
Avoid starting sentences with it is or this unless followed by a noun.
Avoid there is and there are as subjects.
Examples:
Use: "Store the value and use it again later."
Avoid: "Use it again later."
# Use Gender-Neutral Pronouns
Use gender-neutral pronouns (they, them).
Rewriting sentences to avoid gender-specific pronouns.
Examples:
Use: "Every account manager should thank their customer."
Avoid: "Every account manager should thank his or her customer."
# Use Positive Statements
Use positive language rather than negative.
Examples:
Use: "The software works when installed correctly."
Avoid: "The software won't work unless installed correctly."
## Avoid Negative Words
Replace strong negative words with more neutral terms.
Examples:
Avoid: damage (Use affect), catastrophic (Use serious).
# Use Correct Punctuation
Periods at the end of sentences.
Use serial commas.
Avoid semicolons, slashes, exclamations, question marks, ellipses, single quotes.
Examples:
Use: "Click Save."
Avoid: "Click the green button."
# Use Interjections with Care
Rarely use interjections; they can be condescending.
Use sparingly to engage novice users ("Congratulations!").
# Write for Accessibility
Avoid unnecessary formatting and punctuation.
Provide context for UI elements.
Break up text for scannability.
Use meaningful link text and alternative text for images.
Caption media.
Use simple tables.
Format for all abilities.
Examples:
Avoid: "Click the green button."
Use: "Click Save."
# Write for a Global Audience
Avoid idioms, colloquialisms, and humor.
Use jargon appropriately, with explanations as needed.
Use culture-neutral examples and language.
Avoid terms identified as oppressive.
Examples:
Avoid: blacklist/whitelist (Use blocklist/allowlist).
# Concise Terms
Use shorter terms and simplify language.
Examples:
Avoid: "along with" (Use with), "in the event" (Use if).
# Alphabetical List of Terms
Provides usage guidelines for specific terms.
Examples:
Avoid: "admin" (Use "administrator").
# Avoid Obscure Non-English Words and Abbreviations
Replace Latin phrases with clear English alternatives.
Examples:
i.e. (Use that is), e.g. (Use for example).
# Use Consistent Terminology
Standardize word usage and spelling (preferring American English).
Avoid using the same word with different meanings or different words for the same meaning.
Examples:
Use menu command (not menu item, menu option).
# Use Consistent References to Time, Space, and Versions
Use clear terms for time/location references.
Versions: earlier/later, not higher/lower.
Examples:
Use: "Ubuntu 12.04 or earlier."
Avoid: "Ubuntu 12.04 or lower."
# Use Short, Familiar Words and Phrases
Prefer short, familiar words for clarity and ease of understanding.
Favor shorter spellings where acceptable.
Examples:
Avoid: "due to the fact that" (Use because).
