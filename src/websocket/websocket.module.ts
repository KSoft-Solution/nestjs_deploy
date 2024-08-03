import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/websocket/events.gatway';

@Module({
  providers: [EventsGateway]
})
export class EventsModule {}
