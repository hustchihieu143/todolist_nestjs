import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import mqtt from 'mqtt';

@Controller('mqtt')
export class TestMqttController implements OnModuleInit {
  constructor(@Inject('MQ_CLIENT') private client: MqttClient) {
    // client = mqtt.connect('mqtt://localhost:1883');
  }

  onModuleInit() {
    this.client = mqtt.connect('mqtt://localhost:1883');

    this.client.on('connect', function () {
      console.log('okok');
      this.client.subscribe('presence', function (err) {
        if (!err) {
          this.client.publish('presence', 'Hello mqtt');
        }
      });
    });

    this.client.on('presence', function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      this.client.end();
    });
  }
}
