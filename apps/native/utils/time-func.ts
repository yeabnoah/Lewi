
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import dayjs from "dayjs"

dayjs.extend(utc)
dayjs.extend(timezone)

export function getGreeting(    ) {
  const userTimezone = dayjs.tz.guess() // auto-detect device timezone
  const hour = dayjs().tz(userTimezone).hour()

  let greeting: string;

  if (hour < 12) greeting = "Good morning"
  else if (hour < 18) greeting = "Good afternoon"
  else if (hour < 22) greeting = "Good evening"
  else greeting = "Good night"

  return greeting;
}
