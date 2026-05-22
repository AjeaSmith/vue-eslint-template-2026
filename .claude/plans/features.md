# Bill Reminder App — Features

Features are ordered by implementation priority — each layer builds on the one before it.

---

## 1. Authentication

**Description**
Users sign in to the app so their bills are tied to an account and persist across devices and reinstalls.

**User flow**
1. User opens the app for the first time
2. They are prompted to sign in via magic link (email)
3. Once signed in, their bills are available on any device they log in to

**UI overview**
A sign-in screen with a magic link email input. No password required. Once authenticated, the user lands on the bill list.

---

## 2. Bill list

**Description**
The home screen shows all bills sorted by next due date. Bills are colour-coded by urgency so you can see at a glance what needs attention.

**User flow**
1. User opens the app
2. All bills are displayed as a sorted list
3. User scans for anything due soon — amber cards are within 7 days, red cards are due today
4. Paid bills are visible but dimmed at the bottom of the list
5. User taps a bill to mark it paid or edit it

**UI overview**
A scrollable card list. Each card shows the bill name, amount, and days until due. Paid bills are dimmed with a checkmark. No monthly total is shown — the list is the only summary.

---

## 3. Empty state

**Description**
When no bills have been added yet, the app shows a welcoming prompt rather than a blank screen.

**User flow**
1. User opens the app for the first time after signing in
2. An illustration is shown with an "Add your first bill" prompt
3. User taps the prompt or the add button to create their first bill

**UI overview**
A centred illustration with a short prompt and a button to add the first bill. The standard bill list is hidden until at least one bill exists.

---

## 4. Add a bill

**Description**
A form that slides up from the bottom of the screen lets you add a new recurring bill in a few taps.

**User flow**
1. User taps the add button on the home screen
2. A sheet slides up with four fields: name, amount, due date, and recurrence
3. User types the bill name
4. User optionally enters an amount (can be left blank for variable bills)
5. User taps the due date field — a calendar opens to pick the day
6. User selects a recurrence: weekly, monthly, or yearly
7. User taps "Add bill" to save

**UI overview**
A bottom sheet with a drag handle at the top. Fields for name (text input), amount (optional, with a currency prefix), due date (calendar picker), and recurrence (three tappable pill options: weekly, monthly, yearly). Monthly is pre-selected by default. The save button is muted until required fields are filled.

---

## 5. Edit a bill

**Description**
Any existing bill can be edited using the same form, pre-filled with the current values.

**User flow**
1. User taps a bill card on the home screen
2. The same bottom sheet form slides up, pre-filled with the bill's existing details
3. User updates any field and taps "Save bill"

**UI overview**
Identical to the add form but titled "Edit bill" and pre-filled. A "Delete bill" button appears below the save button.

---

## 6. Delete a bill

**Description**
A bill can be permanently deleted from the edit screen, behind a confirmation step to prevent accidents.

**User flow**
1. User opens the edit form for a bill
2. User taps "Delete bill"
3. A confirmation dialog appears asking them to confirm
4. User confirms — the bill is removed and no further notifications will fire

**UI overview**
A destructive-styled "Delete bill" button at the bottom of the edit form. A confirmation dialog with a cancel and confirm option. No undo is available after confirming.

---

## 7. Mark as paid

**Description**
Marking a bill paid for the current cycle silences all further reminders until the next cycle begins.

**User flow**
1. User taps a bill card or swipes it
2. A "Marked as paid" toast appears briefly
3. The card dims to indicate the paid state
4. The bill automatically resets to unpaid when the next cycle begins — no action needed

**UI overview**
A tap or swipe gesture on any bill card. A short toast confirmation at the bottom of the screen. The card transitions to a dimmed state with a green checkmark. The bill reappears as active on the next cycle without any user input.

---

## 8. Automatic cycle reset

**Description**
Bills reset automatically at the start of each new cycle so you never have to manually re-activate them.

**User flow**
1. A bill's due date passes
2. The bill resets to unpaid in the background — no action needed from the user
3. The bill reappears as active on the home screen on the next open
4. Reminders begin firing again for the new cycle

**UI overview**
Nothing visible to the user — the bill card simply reappears as unpaid at the start of the new cycle. If the due day doesn't exist in the current month (e.g. 31st in February), the last day of that month is used instead.

---

## 9. App install (PWA)

**Description**
The app can be installed to the home screen on both Android and iOS for a full-screen, native-like experience.

**User flow — Android**
1. User opens the app in Chrome
2. Chrome displays a native install banner
3. User taps install — the app icon appears on the home screen

**User flow — iOS**
1. User opens the app in Safari
2. Settings screen shows a step-by-step install card
3. User taps the Share button in Safari, then "Add to Home Screen", then "Add"
4. The app icon appears on the home screen and push notifications become active

**UI overview**
On Android, a native browser install banner. On iOS, a card in the Settings screen with three numbered steps and an "Open in Safari to install" button. Both lead to the app running full-screen with no browser chrome. An active internet connection is required to use the app — offline mode is not supported.

---

## 10. Push notifications

**Description**
The app sends push notifications to your device before each bill is due, at a time you choose.

**User flow**
1. On first open, the app asks for notification permission
2. User grants permission
3. Notifications fire automatically in the background at the configured time
4. User receives a lock screen notification with the bill name, amount (if set), and due date
5. Tapping the notification opens the app directly to that bill

**UI overview**
A system permission prompt on first open. Lock screen and notification centre notifications showing the bill name, amount, and due date. No in-app action required for notifications to fire — they happen automatically each day.

---

## 11. Notification settings

**Description**
Users can control when and how often they receive bill reminders from a dedicated settings screen.

**User flow**
1. User navigates to Settings via the bottom nav
2. User toggles push notifications on or off
3. User toggles individual reminder windows (7 days before, 3 days before, day of) independently
4. User taps the send time row — the device's native time picker opens to set the preferred hour
5. Timezone is auto-detected and shown as a read-only value; user can tap to change it manually

**UI overview**
A grouped settings list. A master toggle for push notifications. Three independent toggles for reminder intervals. A send time row that opens the native time picker on tap. A timezone row showing the detected timezone with an "Auto" badge and a hint to tap if they want to change it.

---

## 12. Notification permission denied

**Description**
If the user denies notification permission, the app surfaces a clear explanation and helps them re-enable it.

**User flow**
1. User taps "Don't allow" on the notification permission prompt
2. A banner appears at the top of the bill list
3. User taps the banner — they are taken to the device's system Settings to enable notifications manually

**UI overview**
A persistent banner at the top of the bill list explaining that notifications are off. The banner includes a link that opens system Settings directly.

---

## 13. Expired notification subscription

**Description**
If the push subscription silently expires, the app detects it and prompts the user to re-enable notifications.

**User flow**
1. Push subscription expires in the background
2. On next open, a banner appears on the bill list
3. User taps the banner to re-enable notifications
4. Notifications resume as normal

**UI overview**
A banner at the top of the bill list, similar in style to the permission-denied banner, prompting the user to re-enable notifications with a single tap.

---

## 14. App updates

**Description**
When a new version of the app is available, users are notified with a simple prompt and can update with a single tap.

**User flow**
1. A new version is released
2. On next open, the app detects the update in the background
3. A toast appears at the bottom of the screen
4. User taps "tap to refresh" — the app reloads with the new version, no data is lost

**UI overview**
A non-intrusive toast at the bottom of the screen reading "Update available — tap to refresh."