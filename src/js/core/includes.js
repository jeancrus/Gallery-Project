import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if (!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if (!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function (i, e) {
        const url = $(e).attr('wm-include') //dentro do include terá o elemento 
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include') //exclui a propriedade para que não haja perigo dela ser interpretada novamente

                loadHtmlSuccessCallbacks.forEach(
                    callback => callback(data))

                loadIncludes(e) //funcao recursiva procurando includes dentro das paginas chamadas
            }
        })
    })
}

loadIncludes()