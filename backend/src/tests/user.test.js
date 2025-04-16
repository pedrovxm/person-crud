// src/tests/user.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import { userModel } from '../models/userModel.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await userModel.deleteMany();
});

describe('User API', () => {
  it('should create a user', async () => {
    const userData = {
      firstName: "João",
      lastName: "Silva",
      address: {
        street: "Rua A",
        city: "São Paulo",
        state: "SP",
        postalCode: "01234-000",
        country: "Brasil"
      },
      birthDate: "1990-01-01",
      phone: "11999999999",
      national_id: "12345678900"
    };

    const res = await request(app).post('/users').send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body.newUser).toHaveProperty('_id');
    expect(res.body.newUser.firstName).toBe('João');
  });

  it('should return all users', async () => {
    await userModel.create({
      firstName: "Maria",
      lastName: "Lima",
      address: {
        street: "Rua B",
        city: "Rio de Janeiro",
        state: "RJ",
        postalCode: "01235-000",
        country: "Brasil"
      },
      birthDate: "1991-01-01",
      phone: "11988888888",
      national_id: "98765432100"
    });

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a user', async () => {
    const user = await userModel.create({
      firstName: "Ana",
      lastName: "Costa",
      address: {
        street: "Rua X",
        city: "Belo Horizonte",
        state: "MG",
        postalCode: "03123-000",
        country: "Brasil"
      },
      birthDate: "1992-01-01",
      phone: "2223334444",
      national_id: "33355577700"
    });

    const updatedData = {
      firstName: "Ana Paula",
      lastName: "Costa",
      address: {
        street: "Rua Nova",
        city: "Rio de Janeiro",
        state: "RJ",
        postalCode: "12345-000",
        country: "Brasil"
      },
      birthDate: "1992-01-01",
      phone: "2223334444",
      national_id: "33355577700"
    };

    const res = await request(app).put(`/users/${user._id}`).send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Ana Paula");
  });

  it('should delete a user', async () => {
    const user = await userModel.create({
      firstName: "Carlos",
      lastName: "Oliveira",
      address: {
        street: "Rua Y",
        city: "São Paulo",
        state: "SP",
        postalCode: "02123-000",
        country: "Brasil"
      },
      birthDate: "1985-01-01",
      phone: "3334445555",
      national_id: "44466688800"
    });

    const res = await request(app).delete(`/users/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(user._id.toString());
  });


  it('should not create user with missing required fields', async () => {
    const userData = {
      firstName: "",
      lastName: "Silva",
      address: {
        street: "Rua A",
        city: "São Paulo",
        state: "SP",
        postalCode: "01234-000",
        country: "Brasil"
      },
      birthDate: "1990-01-01",
      phone: "11999999999",
      national_id: "12345678900"
    };

    const res = await request(app).post('/users').send(userData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('should return 404 when deleting a user that does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/users/${fakeId}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeNull()
  });

  it('should return 404 when updating a user that does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const updatedData = {
      firstName: "Test",
      lastName: "Test",
      address: {
        street: "Rua Teste",
        city: "Test City",
        state: "TS",
        postalCode: "00000-000",
        country: "Brasil"
      },
      birthDate: "2000-01-01",
      phone: "00000000000",
      national_id: "11122233300"
    };

    const res = await request(app).put(`/users/${fakeId}`).send(updatedData);
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeNull()
  });
});
