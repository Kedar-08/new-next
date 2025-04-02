import formReducer, { saveForm, resetForm, setReadOnly } from './formSlice';

describe('form reducer', () => {
  const initialState = {
    firstName: '',
    lastName: '',
    gender: '',
    relationship: '',
    fileName: '',
    isReadOnly: false,
  };

  it('should handle initial state', () => {
    // @ts-ignore
    expect(formReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('saveForm reducer', () => {
    it('should update state with provided values and set isReadOnly to true', () => {
      const previousState = { ...initialState };
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
      };
      const expectedState = {
        ...initialState,
        ...payload,
        isReadOnly: true,
      };

      expect(formReducer(previousState, saveForm(payload))).toEqual(expectedState);
    });

    it('should override isReadOnly even if provided in payload', () => {
      const previousState = { ...initialState };
      const payload = {
        firstName: 'John',
        isReadOnly: false, // This should be overridden to true
      };
      const expectedState = {
        ...initialState,
        firstName: 'John',
        isReadOnly: true, // Should always be true after saveForm
      };

      expect(formReducer(previousState, saveForm(payload))).toEqual(expectedState);
    });

    it('should update empty payload but still set isReadOnly to true', () => {
      const previousState = {
        ...initialState,
        firstName: 'John',
      };
      const expectedState = {
        ...previousState,
        isReadOnly: true,
      };

      expect(formReducer(previousState, saveForm({}))).toEqual(expectedState);
    });

    it('should handle updating all fields', () => {
      const previousState = { ...initialState };
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        relationship: 'Single',
        fileName: 'profile.jpg',
      };
      const expectedState = {
        ...payload,
        isReadOnly: true,
      };

      expect(formReducer(previousState, saveForm(payload))).toEqual(expectedState);
    });
  });

  describe('resetForm reducer', () => {
    it('should reset state to initial values', () => {
      const previousState = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        relationship: 'Single',
        fileName: 'profile.jpg',
        isReadOnly: true,
      };

      expect(formReducer(previousState, resetForm())).toEqual(initialState);
    });

    it('should reset state even when state is already initial', () => {
      const previousState = { ...initialState };
      
      // This explicitly checks that a new object is returned
      const result = formReducer(previousState, resetForm());
      expect(result).toEqual(initialState);
      expect(result).not.toBe(previousState); // Verify a new object is created
    });
  });

  describe('setReadOnly reducer', () => {
    it('should set isReadOnly to true', () => {
      const previousState = { ...initialState };
      const expectedState = {
        ...initialState,
        isReadOnly: true,
      };

      expect(formReducer(previousState, setReadOnly(true))).toEqual(expectedState);
    });

    it('should set isReadOnly to false', () => {
      const previousState = {
        ...initialState,
        isReadOnly: true,
      };
      const expectedState = {
        ...initialState,
        isReadOnly: false,
      };

      expect(formReducer(previousState, setReadOnly(false))).toEqual(expectedState);
    });

    it('should not change isReadOnly when value is the same', () => {
      const previousState = {
        ...initialState,
        firstName: 'John',
        isReadOnly: false,
      };
      
      const result = formReducer(previousState, setReadOnly(false));
      expect(result.isReadOnly).toBe(false);
      expect(result).not.toBe(previousState); // Should still return a new object
    });
  });

  describe('action creators', () => {
    it('should create saveForm action with correct payload', () => {
      const payload = { firstName: 'John' };
      const expectedAction = {
        type: 'form/saveForm',
        payload,
      };
      
      expect(saveForm(payload)).toEqual(expectedAction);
    });

    it('should create resetForm action with no payload', () => {
      const expectedAction = {
        type: 'form/resetForm',
      };
      
      expect(resetForm()).toEqual(expectedAction);
    });

    it('should create setReadOnly action with boolean payload', () => {
      const expectedAction = {
        type: 'form/setReadOnly',
        payload: true,
      };
      
      expect(setReadOnly(true)).toEqual(expectedAction);
    });
  });
});