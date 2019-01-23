import EventTile from '../../app/javascript/react/components/EventTile';

describe('Elephant', () => {
  let name,
      description,
      location,
      url,
      organizer,
      onClick,
      text,
      wrapper;

  beforeEach(() => {
    onClick = jasmine.createSpy('onClick spy');
    wrapper = mount(
      <EventTile
        name="Test Event"
        description="This is a test event"
        location="333 Wyman Street"
        url="www.kingbishop.com"
        organizer="King & Bishop"
        date="01/19/19"
        time="11AM"
        addEventToCalendar={onClick}
      />
    );
  });

  it('should render an li tag', () => {
    expect(wrapper.find('li')).toBePresent();
  });

  it('should render an li tag with the text property value', () => {
    expect(wrapper.find('li').text()).toBe('Test Event');
  });

  it('should render a button tag', () => {
    expect(wrapper.find('img')).toBePresent();
  });

  it('should invoke the onClick function from props when clicked', () => {
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
