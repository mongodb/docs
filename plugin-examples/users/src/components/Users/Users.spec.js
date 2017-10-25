import React from 'react';
import { mount } from 'enzyme';

import Users from 'components/Users';
import ToggleButton from 'components/toggle-button';
import styles from './Users.less';

describe('Users [Component]', () => {
  let component;
  let actions;

  beforeEach((done) => {
    actions = { toggleStatus: sinon.stub() };
    component = mount(<Users actions={actions} />);
    done();
  });

  afterEach((done) => {
    component = null;
    actions = null;
    done();
  });

  it('renders the correct root classname', () => {
    expect(component.find(`.${styles.root}`)).to.be.present();
  });

  it('should contain one <h2> tag', () => {
    expect(component.find('h2')).to.have.length(1);
  });

  it('should contain one <ToggleButton />', () => {
    expect(component.find(ToggleButton)).to.have.length(1);
  });

  it('should initially have prop {status: \'enabled\'}', () => {
    expect(component.prop('status')).to.equal('enabled');
  });
});
