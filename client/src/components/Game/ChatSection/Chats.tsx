import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const ChatSection:React.FC = () => {
  return (
    <aside
        className="w-full md:w-1/4 h-full bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Card className="h-full flex flex-col bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-2"></ScrollArea>
            <Separator />
          </CardContent>
        </Card>
      </aside>
  )
}

export default ChatSection
