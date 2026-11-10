// Link data shared by the Feedback Widget views. The visible text lives in the platform-strings catalog.

export const SUBMITTED_VIEW_RESOURCE_LINKS = [
  { textKey: 'feedback.link_community_forums', href: 'https://www.mongodb.com/community/forums/' },
  { textKey: 'feedback.link_university', href: 'https://learn.mongodb.com/' },
] as const;

export const SUBMITTED_VIEW_SUPPORT_LINK = {
  textKey: 'feedback.link_support_case',
  href: 'https://support.mongodb.com/?_ga=2.191926057.2087449804.1701109748-1659791399.1655906873&_gac=1.114903413.1698074435.CjwKCAjws9ipBhB1EiwAccEi1AOuCPf5YadKdTucTL0245YGXrgMbNUsNrZLHXWf-WX73dnW1DOzZBoCR-QQAvD_BwE',
} as const;
