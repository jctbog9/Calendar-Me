Team.create!(name: 'King & Bishop')
User.create!(email: '1234@gmail.com', password: '123456', first_name: 'John', last_name: 'Smith', business_phone: '6176176177', team_id: 1)
Event.create!(name: 'THE Event', address: '333 Wyman Street', city: 'Waltham', state: 'MA', zip: '02451', date: '11/16/18', start_time: '9:00AM', description: 'This is the description')
Signup.create!(user_id: 1, event_id: 1)
