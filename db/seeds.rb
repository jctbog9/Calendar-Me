Team.create!(name: 'King & Bishop')

User.create!(email: '1234@gmail.com', password: '123456', first_name: 'John', last_name: 'Smith', business_phone: '6176176177', team_id: 1)
User.create!(email: 'admin@kingbishop.com', password: '123456789', first_name: 'Admin', last_name: 'Admin', business_phone: '6176176177', team_id: 1, role: "admin")

Event.create!(name: 'THE Event', location: '333 Wyman Street Waltham MA', date: '11/16/18', time: '9:00AM - 12:00PM', description: 'This is the description', url: 'http://www.facebook.com')
Event.create!(name: 'Second Event', location: '333 Wyman Street Waltham MA', date: '11/16/18', time: '2:00PM - 4:00PM', description: 'This is another description', url: 'http://www.facebook.com')

Signup.create!(user_id: 1, event_id: 1)
User.create!(email: 'admin@gmail.com', password: 'admin1', first_name: 'Bill', last_name: 'Butler', business_phone: '6176176177', team_id: 1, role: "admin")
