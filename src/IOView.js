import {useEffect, useRef, useState} from 'react'
import {default as grammar_url} from 'filament-lang/src/filament.ohm'
import {eval_code, setup_parser} from 'filament-lang'
import * as codemirror from 'codemirror'
import "codemirror/addon/mode/simple.js"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/show-hint.css"
import {ResultArea} from './gui/views.js'

codemirror.defineSimpleMode("filament", {
    // The start state contains the rules that are initially used
    start: [
        // The regex matches the token, the token property contains the type
        {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
        {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string"},
        // You can match multiple tokens at once. Note that the captured
        // groups must span the whole string in this case
        {regex: /(def)(\s+)([a-z$][\w$]*)/,
            token: ["keyword", null, "variable-2"]},
        // comments
        {regex: /\/\/.*/,token:"comment"},
        // Rules are matched in the order in which they appear, so there is
        // no ambiguity between this one and the one above
        {regex: /(?:function|def|var|return|if|for|while|else|do|this)\b/,
            token: "keyword"},
        {regex: /true|false|null|undefined/, token: "atom"},
        {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
            token: "number"},
        {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
        {regex: /[-+\/*=<>!]+/, token: "operator"},
        // indent and dedent properties guide autoindentation
        {regex: /[\{\[\(]/, indent: true},
        {regex: /[\}\]\)]/, dedent: true},
        {regex: /[a-z$][\w$]*/, token: "variable"},
    ],
    // The meta property contains global information about the mode. It
    // can contain properties like lineComment, which are supported by
    // all modes, and also directives like dontIndentStates, which are
    // specific to simple modes.
    meta: {
        // dontIndentStates: ["comment"],
        // lineComment: "//"
    }
});

function synonyms(cm, option) {
    console.log("syonmyms")
    return new Promise(function (accept) {
        setTimeout(function () {
            // console.log("cm is",cm)
            // console.log("option is",option)
            // console.log("scope is")
            let names = option.scope.names()
            // console.log(names)
            // accept(null)
            var cursor = cm.getCursor(), line = cm.getLine(cursor.line)
            var start = cursor.ch, end = cursor.ch
            // console.log("start",start,'end',end)

            while (start && /\w/.test(line.charAt(start - 1))) --start
            while (end < line.length && /\w/.test(line.charAt(end))) ++end
            var word = line.slice(start, end).toLowerCase()
            // console.log("word is",word)
            // console.log("scope is",names)
            let matches = names.filter(k => k.startsWith(word))
            // let matches = ["foo","bar"]
            // console.log("matches",matches)
            return accept({
                list: matches,
                from: codemirror.Pos(cursor.line, start),
                to: codemirror.Pos(cursor.line, end)
            })
        }, 100)
    })
}

export function IOView({entry, onChange, scope}) {
    const ref = useRef()
    const [editor, setEditor] = useState(null)
    const [result, setResult] = useState(null)
    const onEval = async (code) => {
        try {
            let grammar = await fetch(grammar_url).then(r => r.text())
            // console.log("got the grammar", grammar)
            await setup_parser(grammar)
            code = "{" + code + "}"
            let d = await eval_code(code,scope)
            console.log("result is ", d)
            setResult(d)
            // console.log("done")
        } catch (e) {
            console.log("an error happened", e)
            setResult(e)
        }
    }
    useEffect(() => {
        if (ref.current && editor === null) {
            let ed = codemirror.fromTextArea(ref.current, {
                value: 'some cool text',
                lineNumbers: true,
                viewportMargin: Infinity,
                mode:'filament',
                hintOptions: {hint: synonyms, completeSingle: false, scope:scope},
                lineWrapping: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                extraKeys: {
                    'Ctrl-Enter': () => onEval(ed.getValue()),
                    "Ctrl-Space": "autocomplete"
                }
            })
            setEditor(ed)
            ed.setValue(entry.input)
            ed.on('changes', () => onChange(ed.getValue()))
        }
        if (ref.current && editor !== null) {
            editor.setValue(entry.input)
            setResult(entry.output)
        }
    }, [entry])


    return <article>
        {/*<h3>block</h3>*/}
        <textarea ref={ref}/>
        <div>
            <button onClick={() => onEval(editor.getValue())}>eval</button>
        </div>
        <ResultArea result={result}/>
    </article>
}