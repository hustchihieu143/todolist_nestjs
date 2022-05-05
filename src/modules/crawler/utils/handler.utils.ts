import { Injectable } from '@nestjs/common';
import { LogEventDto } from '../dto/log-event-crawler.dto';

@Injectable()
export class HandlerEventUtils {
  constructor() {}

  async handlerMLandTokenEvent(events: LogEventDto[]): Promise<void> {
    console.log('event MLandToken' + events);
  }

  async handlerDiggerEvent(events: LogEventDto[]): Promise<void> {
    console.log(events);
    for (const event of events) {
      if (event.event === 'TokenCreateRequested') {
      }
      if (event.event === 'TokenCreated') {
      }
      if (event.event === 'Transfer') {
      }
    }
  }

  async handlerHouseEvent(events: LogEventDto[]): Promise<void> {
    console.log('event House' + events);
  }

  async handlerVaultEvent(events: LogEventDto[]): Promise<void> {
    console.log('event Vault' + events);
  }
}
