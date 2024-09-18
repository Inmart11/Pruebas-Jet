import app from '../src/app'
import request from 'supertest'

describe('GET / tasks', () => {

    test('should respond with a 200 status code', async () => {

        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200);

    });

    test('should response with an array', async () => {

        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })

});

describe('POST / tasks', () => {

    describe('given a title an description', () => {
        const newTask = {
            title: "Test Tasks",
            description: "Test Description"
        }

        test('should resond with a 200 status code', async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200);
        });

        test('should have a cotent-type: application/json in header', async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.headers['content-type']).toEqual
                (expect.stringContaining("json"));
        })

        test('should respond with an task ID', async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe('when title and description is missing', () => {
        test('should responde with 400 status code', async () => {
            const fields = [
                {},
                { title: 'Test Task' },
                { description: 'Test Description' },
            ]

            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    })
});