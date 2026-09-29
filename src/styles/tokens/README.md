# src/styles/tokens — valores de cada tema

| Archivo | Tema | Selector |
|---|---|---|
| `covalto.css` | Empresarial (por defecto) | `:root` y `:root[data-theme='covalto']` |
| `espacial.css` | Inmersivo (espacio exterior) | `:root[data-theme='espacial']` |

Ambos archivos definen **los mismos nombres** de token; solo cambian los
valores. Si agregas un token, agrégalo en los dos (y en
`../tailwind-tema.css`). El contraste de los dos lo verifica
`../contraste/contraste.test.ts`.
