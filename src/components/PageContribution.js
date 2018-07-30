// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { uiContributionGetData, uiContributionUpdateList, uiContributionGetRequests } from '../actions/ui'
import { ROUTE_CONTRIBUTION } from '../utils/routingConstants'
import { uiNavigation } from '../actions/ui'
import AbstractPageDefinitions from './AbstractPageDefinitions'
import { Grid, DropdownButton, MenuItem } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'

class PageContribution extends AbstractPageDefinitions {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, prNumber, token } = this.props
    dispatch(uiNavigation({ to: ROUTE_CONTRIBUTION }))
    dispatch(uiContributionGetRequests(token, prNumber))
    if (prNumber) dispatch(uiContributionGetData(token, prNumber))
  }

  noRowsRenderer() {
    return <div className="placeholder-message">Fetching details on the components included in the pull request.</div>
  }

  tableTitle() {
    const { prNumber, pr } = this.props
    const linkBack = this.props.url.isFetched ? <a href={this.props.url.item}>#{prNumber}</a> : `#${prNumber}`
    const pullRequests = (
      <DropdownButton className="list-button" bsStyle="default" pullRight id="id">
        {pr.list.length > 0 &&
          pr.list.map((pullRequest, index) => {
            return (
              <MenuItem
                className="page-definitions__menu-item"
                key={index}
                eventKey={{ type: index, value: pullRequest }}
              >
                {pullRequest}
              </MenuItem>
            )
          })}
      </DropdownButton>
    )
    return (
      <span>
        Definitions from pull request {linkBack} {pullRequests}
      </span>
    )
  }

  renderSearchBar() {}

  renderButtons() {
    return (
      <div className="pull-right">
        &nbsp;
        <Button bsStyle="default" disabled={!this.hasComponents()} onClick={this.collapseAll}>
          Collapse All
        </Button>
        &nbsp;
        <Button bsStyle="success" disabled={!this.hasComponents()} onClick={this.doSave}>
          Save
        </Button>
      </div>
    )
  }

  readOnly() {
    return true
  }

  updateList(o) {
    return uiContributionUpdateList(o)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    token: state.session.token,
    prNumber: ownProps.location.pathname.slice(ownProps.match.url.length + 1),
    url: state.ui.contribution.url,
    definitions: state.ui.contribution.definitions,
    components: state.ui.contribution.componentList,
    pr: state.ui.contribution.pr,
    filterValue: state.ui.browse.filter,
    filterOptions: state.ui.browse.filterList
  }
}

export default connect(mapStateToProps)(PageContribution)
