import Redis, { RedisOptions } from 'ioredis'

class RedisStore {
  redis: Redis.default

  constructor(redisConfig: RedisOptions) {
    this.redis = new Redis.default(redisConfig)
  }

  // 获取
  async get(key: string): Promise<unknown> {
    const data = await this.redis.get(`SESSION:${key}`)
    return JSON.parse(data)
  }

  // 设置
  async set(key: string, sess: unknown, maxAge: number): Promise<void> {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(sess),
      'EX',
      maxAge / 1000,
    )
  }

  // 销毁
  async destroy(key: string): Promise<number> {
    return await this.redis.del(`SESSION:${key}`)
  }
}

export { RedisStore }
