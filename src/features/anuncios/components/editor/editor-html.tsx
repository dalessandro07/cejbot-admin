'use client'

import React, { useEffect, useState } from 'react'
import Editor, { type ContentEditableEvent } from 'react-simple-wysiwyg'
import sanitizeHtml from 'sanitize-html'

interface EditorHTMLProps {
  initialValue?: string
  name: string
  id?: string
  onChange?: (value: string) => void
}

function sanitize (html: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'a',
      'ul',
      'ol',
      'li',
      'blockquote',
      'code',
      'pre',
      'figure',
      'figcaption',
      'div',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target'],
      img: ['src', 'alt'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'lh3.googleusercontent.com'],
  })
}

export default function EditorHTML ({ initialValue = '', name, id, onChange }: EditorHTMLProps) {
  const [html, setHtml] = useState(initialValue)
  const [showHtmlEditor, setShowHtmlEditor] = useState(false)

  // Actualizar html si cambia initialValue (por ejemplo, al editar un anuncio existente)
  useEffect(() => {
    setHtml(initialValue)
  }, [initialValue])
  // Manejar cambios en el editor WYSIWYG
  function onWysiwygChange (e: ContentEditableEvent) {
    const sanitized = sanitize(e.target.value)
    setHtml(sanitized)
    if (onChange) onChange(sanitized)
  }

  // Manejar cambios en el editor HTML directo
  function onHtmlEditorChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    const sanitized = sanitize(e.target.value)
    setHtml(sanitized)
    if (onChange) onChange(sanitized)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-2">
        <Editor
          className="p-2 border rounded-md border-input min-h-32"
          value={html}
          onChange={onWysiwygChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setShowHtmlEditor(!showHtmlEditor)}
          className="text-xs underline text-muted-foreground"
        >
          {showHtmlEditor ? "Ocultar editor HTML" : "Ver/editar HTML"}
        </button>
      </div>

      {showHtmlEditor && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 font-mono text-xs border rounded-md border-input"
            rows={5}
            value={html}
            onChange={onHtmlEditorChange}
          />
        </div>
      )}

      {/* Campo oculto para enviar el valor en el formulario */}
      <input type="hidden" name={name} id={id || name} value={html} />
    </div>
  )
}
