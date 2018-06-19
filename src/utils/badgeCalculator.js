// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

const { get } = require('lodash')

export default class BadgeCalculator {
  constructor(definition) {
    this.definition = definition
  }

  // @todo we need to flesh this out
  // For now it just checks that a license and copyright holders are present
  calculateScore() {
    const hasLicense = get(this.definition, 'licensed.declared')
    const hasAttributionParties = get(this.definition, 'licensed.attribution.parties[0]')
    if (hasLicense && hasAttributionParties) return 2
    if (hasLicense || hasAttributionParties) return 1
    return 0
  }
}
