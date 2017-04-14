// @flow
export const HEADER_RESET = 'HEADER_RESET';
export const HEADER_SEARCH_TOGGLE = 'HEADER_SEARCH_TOGGLE';
export const HEADER_ACCOUNT_TOGGLE = 'HEADER_ACCOUNT_TOGGLE';
export const HEADER_MENU_TOGGLE = 'HEADER_MENU_TOGGLE';

export function headerReset() {
  return {
    type: HEADER_RESET,
  };
}

export function headerAccountToggle() {
  return {
    type: HEADER_ACCOUNT_TOGGLE,
  };
}

export function headerSearchToggle() {
  return {
    type: HEADER_SEARCH_TOGGLE,
  };
}

export function headerMenuToggle() {
  return {
    type: HEADER_MENU_TOGGLE,
  };
}
