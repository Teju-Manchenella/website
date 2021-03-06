// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import React from 'react'
import PropTypes from 'prop-types'
import { RowEntityList, CopyUrlButton, DefinitionEntry } from './'
import { Button, OverlayTrigger, Tooltip, ButtonGroup } from 'react-bootstrap'
import { get } from 'lodash'
import EntitySpec from '../utils/entitySpec'
import { getBadgeUrl } from '../api/clearlyDefined'
import { ROUTE_INSPECT } from '../utils/routingConstants'

export default class ComponentList extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    listLength: PropTypes.number,
    listHeight: PropTypes.number,
    loadMoreRows: PropTypes.func,
    onRemove: PropTypes.func,
    onAddComponent: PropTypes.func,
    onChange: PropTypes.func,
    onCurate: PropTypes.func,
    onInspect: PropTypes.func,
    noRowsRenderer: PropTypes.func,
    renderFilterBar: PropTypes.func,
    definitions: PropTypes.object,
    githubToken: PropTypes.string,
    sequence: PropTypes.number
  }

  static defaultProps = {
    loadMoreRows: () => {}
  }

  constructor(props) {
    super(props)
    this.state = { contentSeq: 0, sortOrder: null, changes: {} }
    this.renderRow = this.renderRow.bind(this)
    this.renderButtons = props.renderButtons || this.renderButtons.bind(this)
    this.rowHeight = this.rowHeight.bind(this)
    this.onEntryChange = this.onEntryChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.definitions.sequence !== this.props.definitions.sequence) this.incrementSequence()
    if (newProps.sequence !== this.props.sequence) this.incrementSequence()
  }

  getDefinition(component) {
    return this.props.definitions.entries[EntitySpec.fromCoordinates(component).toPath()]
  }

  removeComponent(component, event) {
    event.stopPropagation()
    const { onRemove } = this.props
    onRemove && onRemove(component)
  }

  inspectComponent(component, event) {
    event.stopPropagation()
    const action = this.props.onInspect
    action && action(component)
  }

  curateComponent(component, event) {
    event.stopPropagation()
    const action = this.props.onCurate
    action && action(component)
  }

  addSourceForComponent(component, event) {
    event.stopPropagation()
    const definition = this.getDefinition(component)
    const sourceLocation = get(definition, 'described.sourceLocation')
    const sourceEntity = sourceLocation && EntitySpec.fromSourceCoordinates(sourceLocation)
    const action = this.props.onAddComponent
    action && sourceEntity && action(sourceEntity, component)
  }

  onEntryChange(component, changes) {
    const { onChange } = this.props
    const newComponent = { ...component, changes }
    onChange && onChange(component, newComponent)
    this.incrementSequence()
  }

  incrementSequence() {
    this.setState({ ...this.state, contentSeq: this.state.contentSeq + 1 })
  }

  rowHeight({ index }) {
    const component = this.props.list[index]
    return component.expanded ? 150 : 50
  }

  renderButtonWithTip(button, tip) {
    const toolTip = <Tooltip id="tooltip">{tip}</Tooltip>
    return (
      <OverlayTrigger placement="top" overlay={toolTip}>
        {button}
      </OverlayTrigger>
    )
  }

  isSourceComponent(component) {
    return ['github', 'sourcearchive'].includes(component.provider)
  }

  renderButtons(definition) {
    const component = EntitySpec.fromCoordinates(definition.coordinates)
    const { readOnly } = this.props
    const isSourceComponent = this.isSourceComponent(component)
    return (
      <div className="list-activity-area">
        <img className="list-buttons" src={getBadgeUrl(definition)} alt="score" />
        <ButtonGroup>
          {!isSourceComponent &&
            !readOnly && (
              <Button className="list-hybrid-button" onClick={this.addSourceForComponent.bind(this, component)}>
                <i className="fas fa-plus" />
                <span>&nbsp;Add source</span>
              </Button>
            )}
          {this.renderButtonWithTip(
            <Button className="list-fa-button" onClick={this.inspectComponent.bind(this, component)}>
              <i className="fas fa-search" />
            </Button>,
            'Dig into this definition'
          )}
          <CopyUrlButton route={ROUTE_INSPECT} path={component.toPath()} bsStyle="default" className="list-fa-button" />
        </ButtonGroup>
        {!readOnly && <i className="fas fa-times list-remove" onClick={this.removeComponent.bind(this, component)} />}
      </div>
    )
  }

  toggleExpanded(component) {
    const { onChange } = this.props
    onChange && onChange(component, { ...component, expanded: !component.expanded })
    this.incrementSequence()
  }

  renderRow({ index, key, style }, toggleExpanded = null, showExpanded = false) {
    const { list, readOnly } = this.props
    const component = list[index]
    let definition = this.getDefinition(component)
    definition = definition || { coordinates: component }
    return (
      <div key={key} style={style}>
        <DefinitionEntry
          readOnly={readOnly}
          onClick={() => this.toggleExpanded(component)}
          definition={definition}
          component={component}
          onChange={this.onEntryChange}
          otherDefinition={definition.otherDefinition}
          classOnDifference="bg-info"
          renderButtons={this.renderButtons}
        />
      </div>
    )
  }

  render() {
    const { loadMoreRows, listHeight, noRowsRenderer, list, listLength, renderFilterBar } = this.props
    const { sortOrder, contentSeq } = this.state
    return (
      <div>
        {renderFilterBar()}
        <RowEntityList
          list={list}
          listLength={listLength}
          loadMoreRows={loadMoreRows}
          listHeight={listHeight}
          rowRenderer={this.renderRow}
          rowHeight={this.rowHeight}
          noRowsRenderer={noRowsRenderer}
          sortOrder={sortOrder}
          contentSeq={contentSeq}
        />
      </div>
    )
  }
}
