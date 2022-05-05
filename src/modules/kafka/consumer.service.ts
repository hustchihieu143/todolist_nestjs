import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerSubscribeTopic } from '@nestjs/microservices/external/kafka.interface';
import { Consumer, ConsumerRunConfig, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9093'],
  });
  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    // create consumer
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });

    // subcribing topic
    await consumer.connect();
    await consumer.subscribe(topic);

    await consumer.run(config);
    this.consumers.push(consumer);
    console.log('consumer: ', this.consumers);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      console.log('kafka shutdown');
      await consumer.disconnect();
    }
  }
}
