// Creates a canvas with given width and height
function create(id, parent, width, height) {
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");
    div.setAttribute("id", id);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height)

    parent.appendChild(div);
    div.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    return {
        ctx: ctx,
        id:id
    };
}

function createReportList(wrapperId) {
    let list = document.createElement('ul');
    list.id = wrapperId + '-reporter';
  
    let canvasWrapper = document.getElementById(wrapperId);
    canvasWrapper.appendChild(list);
  
    return list.id;
}

export {create, createReportList};