// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import { asyncActions } from './'
import {
  getDefinitions,
  getDefinition,
  previewDefinition,
  getDefinitionSuggestions,
  getBadge
} from '../api/clearlyDefined'

export const DEFINITION_LIST = 'DEFINITION_LIST'
export const DEFINITION_BODIES = 'DEFINITION_BODIES'
export const DEFINITION_BADGES = 'DEFINITION_BADGES'

export function getDefinitionAction(token, entity, name) {
  return dispatch => {
    const actions = asyncActions(name)
    dispatch(actions.start())
    return getDefinition(token, entity).then(
      result => dispatch(actions.success(result)),
      error => dispatch(actions.error(error))
    )
  }
}

export function getDefinitionsAction(token, entities) {
  return dispatch => {
    const actions = asyncActions(DEFINITION_BODIES)
    dispatch(actions.start())
    return getDefinitions(token, entities).then(
      result => dispatch(actions.success({ add: result })),
      error => dispatch(actions.error(error))
    )
  }
}

export function getBadgesAction(score) {
  return dispatch => {
    const actions = asyncActions(DEFINITION_BADGES)
    dispatch(actions.start())
    return getBadge(score).then(
      result => dispatch(actions.success({ add: result })),
      error => dispatch(actions.error(error))
    )
  }
}

export function getDefinitionSuggestionsAction(token, prefix, name) {
  return dispatch => {
    if (!prefix) return null
    const actions = asyncActions(name)
    dispatch(actions.start())
    return getDefinitionSuggestions(token, prefix).then(
      result => dispatch(actions.success(result)),
      error => dispatch(actions.error(error))
    )
  }
}

export function previewDefinitionAction(token, entity, curation, name) {
  return dispatch => {
    const actions = asyncActions(name)
    dispatch(actions.start())
    return previewDefinition(token, entity, curation).then(
      result => dispatch(actions.success(result)),
      error => dispatch(actions.error(error))
    )
  }
}
