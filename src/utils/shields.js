// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import React from 'react'

export default function getBadge(score) {
  switch (score) {
    case 0:
      return (
        <div
          className="list-buttons"
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="108" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="108" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h91v20H0z"/><path fill="#e05d44" d="M91 0h17v20H91z"/><path fill="url(#b)" d="M0 0h108v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"><text x="465" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="810">ClearlyDefined</text><text x="465" y="140" transform="scale(.1)" textLength="810">ClearlyDefined</text><text x="985" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="70">0</text><text x="985" y="140" transform="scale(.1)" textLength="70">0</text></g> </svg>'
          }}
        />
      )
    case 1:
      return (
        <div
          className="list-buttons"
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="108" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="108" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h91v20H0z"/><path fill="#dfb317" d="M91 0h17v20H91z"/><path fill="url(#b)" d="M0 0h108v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"><text x="465" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="810">ClearlyDefined</text><text x="465" y="140" transform="scale(.1)" textLength="810">ClearlyDefined</text><text x="985" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="70">1</text><text x="985" y="140" transform="scale(.1)" textLength="70">1</text></g> </svg>'
          }}
        />
      )
    case 2:
      return (
        <div
          className="list-buttons"
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="108" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="108" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h91v20H0z"/><path fill="#4c1" d="M91 0h17v20H91z"/><path fill="url(#b)" d="M0 0h108v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"><text x="465" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="810">ClearlyDefined</text><text x="465" y="140" transform="scale(.1)" textLength="810">ClearlyDefined</text><text x="985" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="70">2</text><text x="985" y="140" transform="scale(.1)" textLength="70">2</text></g> </svg>'
          }}
        />
      )
  }
}
