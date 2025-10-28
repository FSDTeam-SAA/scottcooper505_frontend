"use client"

interface TimeSlot {
  startTime: string
  endTime: string
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[]
  selectedSlot: TimeSlot | null
  onSelectSlot: (slot: TimeSlot) => void
}

export default function TimeSlotSelector({ slots, selectedSlot, onSelectSlot }: TimeSlotSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {slots.map((slot, index) => {
        const isSelected = selectedSlot?.startTime === slot.startTime && selectedSlot?.endTime === slot.endTime

        return (
          <button
            key={index}
            onClick={() => onSelectSlot(slot)}
            className={`
              p-3 rounded-lg border-2 transition-all font-medium text-sm
              ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }
            `}
          >
            <div className="flex items-center justify-center">
              <div className="text-base text-black font-semibold">{slot.startTime}</div>
              <div className="text-base text-black font-semibold">- {slot.endTime}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
