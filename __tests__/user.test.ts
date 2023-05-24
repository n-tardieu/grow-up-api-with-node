import { expect, describe, it } from 'vitest';

import request from 'supertest';
import app from '../src/index';

const api = request(app);

describe('Users API', () => {
    it('should get users', async () => {
        const response = await api.get(`/users/`);
        expect(response.statusCode).toBe(200);
    });
});
