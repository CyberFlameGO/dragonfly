window.cls = window.cls || {};

/**
 * @constructor
 * @extends ViewBase
 */
cls.ResourceManagerAllView = function(id, name, container_class, html, default_handler) {
  this._service = new cls.ResourceManagerService();
  this._sort_by = "name";
  this._reverse = false;
  this._columns = [];

  this.createView = function(container)
  {
    this._render_main_view(container);
  };

  this._render_main_view = function(container)
  {
    var ctx = this._service.get_request_context();
    this._table = new SortableTable(this._tabledef, ctx.resources.slice(0))
    container.clearAndRender(this._table.render())
  };

  this._handle_open_resource_bound = function(evt, target)
  {
    var rid = target.getAttribute("data-object-id");

    var obj = this._service.get_resource_for_id(rid);
    var view = new cls.GenericResourceDetail(obj)
    var ui = UI.get_instance();
    ui.get_tabbar("resources").add_tab(view.id);
    //ui.show_view(view.id);
  }.bind(this);


  this._tabledef = {
    handler: "resources-all-open",
    idgetter: function(res) { return String(res.urlload.resourceID) },
    groups: {
      hosts: {
        label: "Hosts",
        grouper: function(res) { return cls.ResourceUtil.url_host(res.urlload.url) }
      }
    },
    columns: {
      icon: {
        label: "Icon",
        sorter: "unsortable",
        renderer: function(res) {
          return templates.resource_icon(res.urlfinished ?
                                         res.urlfinished.mimeType :
                                         null) },
      },
      host: {
        label: "Host",
        getter: function(res) { return cls.ResourceUtil.url_host(res.urlload.url) },
      },
      path: {
        label: "Path",
        getter: function(res) { return cls.ResourceUtil.url_path(res.urlload.url) },
      },
      mime: {
        label: "Mime",
        getter: function(res) { return res.urlfinished ? res.urlfinished.mimeType : "n/a" }
      },
      type: {
        label: "Type",
        getter: function(res) { return res.urlfinished ? cls.ResourceUtil.mime_to_type(res.urlfinished.mimeType) : "n/a" }
      },
      size: {
        label: "Size",
        getter: function(res) { return String(res.urlfinished ? res.urlfinished.contentLength : "n/a") },
      },
      size_h: {
        label: "Size(h)",
        getter: function(res) {
          return String(res.urlfinished ?
                        cls.ResourceUtil.bytes_to_human_readable(res.urlfinished.contentLength) :
                        "n/a")
        }
      }
    },
  }

  var eh = window.eventHandlers;
  eh.click["resources-all-open"] = this._handle_open_resource_bound;

  this.init(id, name, container_class, html, default_handler);
};
cls.ResourceManagerAllView.prototype = ViewBase;
