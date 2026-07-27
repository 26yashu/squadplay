# Ludo Quality Assurance Checklist

This checklist contains manual test cases to verify Ludo gameplay mechanics, UI/UX, and AI integrations.

## Core Rules & Movement
- [ ] Roll dice manually; ensure it results in a random integer between 1 and 6.
- [ ] Attempt to click dice repeatedly during animation; verify multiple rolls are prevented.
- [ ] Roll a non-6 while all tokens are in base; verify turn passes automatically.
- [ ] Roll a 6 while tokens are in base; verify token can leave base and moves to the correct starting cell.
- [ ] Ensure rolling a 6 grants an extra turn.
- [ ] Ensure rolling three 6s in a row automatically skips the turn.
- [ ] Move token along perimeter; verify path interpolation is smooth.
- [ ] Move token past home entry; ensure it correctly enters the colored home stretch.
- [ ] Attempt to overshoot the center finish; verify move is disallowed unless roll is exact.
- [ ] Land token on exactly cell 5 of home stretch; verify it transitions to finished state.

## Captures & Safe Cells
- [ ] Land on an opponent's token on a standard cell; verify opponent returns to base.
- [ ] Land on an opponent's token; verify the capturing player is granted an extra turn.
- [ ] Land on a friendly token; verify they stack peacefully without capturing.
- [ ] Land on an opponent's token on a designated safe cell (star or colored home entry); verify opponent is NOT captured.

## UI & Feedback
- [ ] Verify the current player's panel highlights appropriately.
- [ ] Ensure movable tokens display a pulse/glow effect when a roll completes.
- [ ] Ensure non-movable tokens are not clickable and do not pulse.
- [ ] Verify token capture animation (returns to base).
- [ ] Verify token movement animation plays at standard 60fps without layout shifts.
- [ ] Toggle global sound in settings; verify Ludo audio respects mute state.

## Bot Engine & AI
- [ ] Start match with Easy AI; verify it moves randomly.
- [ ] Start match with Medium AI; verify it attempts captures when possible.
- [ ] Start match with Hard AI; verify it prioritizes winning, capturing, and safe zones.
- [ ] Verify bots automatically roll dice without human interaction.
- [ ] Verify bots have a natural 500-800ms delay between actions.
- [ ] Run AI vs AI match; verify game concludes without intervention.

## Persistence & SquadPlay Systems
- [ ] Finish match; verify XP is awarded for participation.
- [ ] Finish match; verify winner receives bonus XP.
- [ ] Defeat a Hard AI; verify bonus XP is awarded.
- [ ] Finish match; verify history is recorded in the Profile/History screen.
- [ ] Finish match; verify Leaderboards update correctly.
- [ ] Finish match; verify "First Win" achievement triggers correctly.

## Edge Cases
- [ ] Disconnect internet/go offline; verify game works natively offline.
- [ ] Refresh page during setup; verify state doesn't crash.
- [ ] Navigate away mid-game and return; verify game state is lost cleanly without crashing.
- [ ] Setup game with 2 players (opposite colors); verify starting positions.
- [ ] Setup game with 3 players; verify starting positions.
