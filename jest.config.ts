import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        preset: 'ts-jest',
        testEnvironment: 'node',
        moduleNameMapper: {
            '^@config/(.*)$': '<rootDir>/src/config/$1',
            '^@jobs/(.*)$': '<rootDir>/src/jobs/$1',
            '^@services/(.*)$': '<rootDir>/src/services/$1',
            '^@models/(.*)$': '<rootDir>/src/models/$1',
            '^@utils/(.*)$': '<rootDir>/src/utils/$1',
            '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
            '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1'
        }
    }
}
