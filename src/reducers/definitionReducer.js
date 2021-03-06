// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import { combineReducers } from 'redux'
import { DEFINITION_BODIES } from '../actions/definitionActions'
import tableReducer from './tableReducer'

export default combineReducers({
  bodies: tableReducer(DEFINITION_BODIES)
})
