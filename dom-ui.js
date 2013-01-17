(function($){
    $.fn.COMPONENT = [];
    $.fn.DOM_UI = function(oHtml)
    {
        return this.each
        (
            function(){
                $(this).append(oHtml);
                var i = $.fn.COMPONENT.length;
                while (i--) !function(oObj) {
                    $(oObj.element)[oObj.type](oObj.attributes);
                }($.fn.COMPONENT[i])
                $.fn.COMPONENT = [];               
            }
        )
    }
})(jQuery);
//
!function() {
  var root  = this
  var slice = Array.prototype.slice
  var has   = Object.prototype.hasOwnProperty
  var tags  = [
    "A", "ABBR", "ACRONYM", "ADDRESS", "AREA", "ARTICLE", "ASIDE", "AUDIO",
    "B", "BDI", "BDO", "BIG", "BLOCKQUOTE", "BODY", "BR", "BUTTON",
    "CANVAS", "CAPTION", "CITE", "CODE", "COL", "COLGROUP", "COMMAND",
    "DATALIST", "DD", "DEL", "DETAILS", "DFN", "DIV", "DL", "DT", "EM",
    "EMBED", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAME",
    "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HEADER",
    "HGROUP", "HR", "HTML", "I", "IFRAME", "IMG", "INPUT", "INS", "KBD",
    "KEYGEN", "LABEL", "LEGEND", "LI", "LINK", "MAP", "MARK", "META",
    "METER", "NAV", "NOSCRIPT", "OBJECT", "OL", "OPTGROUP", "OPTION",
    "OUTPUT", "P", "PARAM", "PRE", "PROGRESS", "Q", "RP", "RT", "RUBY",
    "SAMP", "SCRIPT", "SECTION", "SELECT", "SMALL", "SOURCE", "SPAN",
    "SPLIT", "STRONG", "STYLE", "SUB", "SUMMARY", "SUP", "TABLE", "TBODY",
    "TD", "TEXTAREA", "TFOOT", "TH", "THEAD", "TIME", "TITLE", "TR",
    "TRACK", "TT", "UL", "VAR", "VIDEO", "WBR", 
    // BASE
    { type: 'DRAGGABLE', element: 'DIV' },
    { type: 'DROPPABLE', element: 'DIV' },
    { type: 'RESIZABLE', element: 'DIV' },
    { type: 'PAGINATION', element: 'DIV' },
    { type: 'SEARCHBOX', element: 'INPUT' },
    { type: 'PROGRESSBAR', element: 'DIV'},
    // LAYOUT
    { type: 'PANEL', element: 'DIV' },
    { type: 'TABS', element: 'DIV' },
    { type: 'ACCORDION', element: 'DIV' },
    { type: 'LAYOUT', element: 'DIV' },
    // MENU AND BUTTON
    { type: 'MENU', element: 'DIV' },
    { type: 'LINKBUTTON', element: 'A' },
    { type: 'MENUBUTTON', element: 'A' },
    { type: 'SPLITBUTTON', element: 'A' },
    // FORM
    { type: 'FORM', element: 'FORM' },
    { type: 'VALIDATEBOX', element: 'INPUT' },
    { type: 'COMBO', element: 'INPUT' },
    { type: 'COMBOBOX', element: 'SELECT' },
    { type: 'COMBOGRID', element: 'SELECT' },
    { type: 'COMBOTREE', element: 'INPUT' },
    { type: 'NUMBERBOX', element: 'INPUT' },
    { type: 'DATEBOX', element: 'INPUT' },
    { type: 'DATETIMEBOX', element: 'INPUT' },
    { type: 'CALENDAR', element: 'DIV' },
    { type: 'SPINNER', element: 'INPUT' },
    { type: 'NUMBERSPINNER', element: 'INPUT' },
    { type: 'TIMESPINNER', element: 'INPUT' },
    { type: 'SLIDER', element: 'DIV' },
    // WINDOWS
    { type: 'WINDOW', element: 'DIV' },
    { type: 'DIALOG', element: 'DIV' },
    // DATAGRID AND TREE
    { type: 'DATAGRID', element: 'TABLE' },
    { type: 'PROPERTYGRID', element: 'TABLE' },
    { type: 'TREE', element: 'UL' },
    { type: 'TREEGRID', element: 'TABLE' }
  ]

  var i = tags.length
  var oElement;
  while (i--) !function(nodeName) {
      
    root[!nodeName.type ? nodeName : nodeName.type] = function(attributes) {
      var childNodes = slice.call(arguments, 1)

      if (typeof attributes != "object" || attributes.nodeType) {
        childNodes.unshift(attributes)
        attributes = null
      }
      if(!nodeName.type)
        return Element(document, nodeName, attributes, childNodes)
      else
      {
        oElement = Element(document, nodeName.element, attributes, childNodes);
        $.fn.COMPONENT.push({ type: nodeName.type.toLowerCase(), attributes: attributes, element: oElement });
        return oElement;
      }
    }
  }(tags[i])

  function hyphenify(text) {
    return text.replace(/[A-Z]/g, "-$&").toLowerCase()
  }

  function Element(document, nodeName, attributes, childNodes) {
    var child, i, el = document.createElement(nodeName)

    for (i in attributes) if (has.call(attributes, i)) {
        if(['object','function'].indexOf(typeof attributes[i]) === -1)
        {
            child = document.createAttribute(hyphenify(i))
            child.nodeValue = attributes[i]
            el.setAttributeNode(child)
        }
    }

    for (i = 0; i < childNodes.length; i++) {
      child = childNodes[i]

      if (!child || !child.nodeType) child = document.createTextNode(child)

      el.appendChild(child)
    }

    return el
  }

  root.CSS = function(selector) {
    var css = selector + "{"
    var i = 1
    var l = arguments.length
    var key
    var block

    while (i < l) {
      block = arguments[i++]

      switch (typeof block) {
        case "object":
          for (key in block) {
            css += hyphenify(key) + ":" + block[key]

            if (typeof block[key] == "number") css += "px"

            css += ";"
          }
          break

        case "string":
          css = selector + " " + block + css
          break
      }
    }

    css += "}\n"

    return css
  }
}()
