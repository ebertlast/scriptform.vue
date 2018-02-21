<template>
  <div>
    <!-- <input type="text" v-model="src"> -->
    <div class="col-sm-2">
		<input id="page" class="touchspin form-control input-sm" v-model.number="page">
    </div>
    /{{numPages}}

    <!-- <input class="touchspin form-control" type="text" v-model="page"> -->

    <pdf :src="src"
      :page="page"
      @num-pages="numPages = $event"
      style="width:100%"></pdf>
  </div>
</template>

<script>
/*
  ######################################
  Most of this code is just inline imports due to jsfiddle limitations, the code
  you would actually use is in the HTML and in the new Vue block all the way at
  the bottom. No custom CSS is used for this demo, all the css used here are just
  imports that would be included automatically by vue. For more information
  please see https://github.com/FranckFreiburger/vue-pdf/blob/master/README.md

  HOW TO UPDATE THIS DEMO:

    1. inline the resizeSensor script
    2. change export default to `const resizeSensor = {`
    3. inline the pdf.vue script
    4. remove import and PDFJS lines form the pdf.js headers
    5. Find the export default line and change it to `const pdf =`
    6. inline the syles for resize-sensor.vue and pdf.vue

  ######################################
  */

// ############################# resizesensor.js #############################
const resizeSensor = {
  // thanks to https://github.com/marcj/css-element-queries
  props: {
    initial: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      size: {
        width: -1,
        height: -1
      }
    };
  },
  methods: {
    reset: function() {
      var expand = this.$el.firstChild;
      var shrink = this.$el.lastChild;
      expand.scrollLeft = 100000;
      expand.scrollTop = 100000;
      shrink.scrollLeft = 100000;
      shrink.scrollTop = 100000;
    },
    update: function() {
      this.size.width = this.$el.offsetWidth;
      this.size.height = this.$el.offsetHeight;
    }
  },
  watch: {
    size: {
      deep: true,
      handler: function(size) {
        this.reset();
        this.$emit("resize", {
          width: this.size.width,
          height: this.size.height
        });
      }
    }
  },
  render: function(create) {
    var style =
      "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
    var styleChild = "position: absolute; left: 0; top: 0;";

    return create(
      "div",
      {
        style: style + "animation-name: resizeSensorVisibility;",
        on: {
          "~animationstart": this.update
        }
      },
      [
        create(
          "div",
          {
            style: style,
            on: {
              scroll: this.update
            }
          },
          [
            create("div", {
              style: styleChild + "width: 100000px; height: 100000px;"
            })
          ]
        ),
        create(
          "div",
          {
            style: style,
            on: {
              scroll: this.update
            }
          },
          [
            create("div", {
              style: styleChild + "width: 200%; height: 200%;"
            })
          ]
        )
      ]
    );
  },
  beforeDestroy: function() {
    this.$emit("resize", { width: 0, height: 0 });
    this.$emit("resizeSensorBeforeDestroy");
  },
  mounted: function() {
    if (this.initial === true) this.$nextTick(this.update);

    if (this.$el.offsetParent !== this.$el.parentNode)
      this.$el.parentNode.style.position = "relative";

    if ("attachEvent" in this.$el && !("AnimationEvent" in window)) {
      var onresizeHandler = function() {
        this.update();
        removeOnresizeEvent();
      }.bind(this);

      var removeOnresizeEvent = function() {
        this.$el.detachEvent("onresize", onresizeHandler);
        this.$off("resizeSensorBeforeDestroy", removeOnresizeEvent);
      }.bind(this);

      this.$el.attachEvent("onresize", onresizeHandler);
      this.$on("resizeSensorBeforeDestroy", removeOnresizeEvent);
      this.reset();
    }
  }
};

// ###################################### vue-pdf.js ############################################

function isPDFDocumentLoadingTask(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    obj.__PDFDocumentLoadingTask === true
  );
}
function createLoadingTask(src, options) {
  var loadingTask = PDFJS.getDocument(src);
  loadingTask.__PDFDocumentLoadingTask = true; // since PDFDocumentLoadingTask is not public

  if (options && options.onPassword)
    loadingTask.onPassword = options.onPassword;
  if (options && options.onProgress)
    loadingTask.onProgress = options.onProgress;
  return loadingTask;
}
function PDFJSWrapper(PDFJS, canvasElt, annotationLayerElt, emitEvent) {
  var pdfDoc = null;
  var pdfPage = null;
  var pdfRender = null;
  function clearCanvas() {
    canvasElt
      .getContext("2d")
      .clearRect(0, 0, canvasElt.width, canvasElt.height);
  }

  function clearAnnotations() {
    while (annotationLayerElt.firstChild)
      annotationLayerElt.removeChild(annotationLayerElt.firstChild);
  }

  this.destroy = function() {
    if (pdfDoc === null) return;
    pdfDoc.destroy();
    pdfDoc = null;
  };

  this.getResolutionScale = function() {
    return canvasElt.offsetWidth / canvasElt.width;
  };
  this.printPage = function(dpi, pageNumberOnly) {
    if (pdfPage === null) return;

    // 1in == 72pt
    // 1in == 96px
    var PRINT_RESOLUTION = dpi === undefined ? 150 : dpi;
    var PRINT_UNITS = PRINT_RESOLUTION / 72.0;
    var CSS_UNITS = 96.0 / 72.0;

    var iframeElt = document.createElement("iframe");
    function removeIframe() {
      iframeElt.parentNode.removeChild(iframeElt);
    }

    new Promise(function(resolve, reject) {
      iframeElt.frameBorder = "0";
      iframeElt.scrolling = "no";
      iframeElt.width = "0px;";
      iframeElt.height = "0px;";
      iframeElt.style.cssText = "position: absolute; top: 0; left: 0";
      iframeElt.onload = function() {
        resolve(this.contentWindow);
      };

      window.document.body.appendChild(iframeElt);
    })
      .then(function(win) {
        win.document.title = "";
        return pdfDoc.getPage(1).then(function(page) {
          var viewport = page.getViewport(1);
          win.document.head.appendChild(
            win.document.createElement("style")
          ).textContent =
            "@supports ((size:A4) and (size:1pt 1pt)) {" +
            "@page { margin: 1pt; size: " +
            viewport.width * PRINT_UNITS / CSS_UNITS +
            "pt " +
            viewport.height * PRINT_UNITS / CSS_UNITS +
            "pt; }" +
            "}" +
            "@media print {" +
            "body { margin: 0 }" +
            "canvas { page-break-before: avoid; page-break-after: always; page-break-inside: avoid }" +
            "}" +
            "@media screen {" +
            "body { margin: 0 }" +
            "}" +
            "";
          return win;
        });
      })
      .then(function(win) {
        var allPages = [];

        for (var pageNumber = 1; pageNumber <= pdfDoc.numPages; ++pageNumber) {
          if (
            pageNumberOnly !== undefined &&
            pageNumberOnly.indexOf(pageNumber) === -1
          )
            continue;

          allPages.push(
            pdfDoc.getPage(pageNumber).then(function(page) {
              var viewport = page.getViewport(1);

              var printCanvasElt = win.document.body.appendChild(
                win.document.createElement("canvas")
              );
              printCanvasElt.width = viewport.width * PRINT_UNITS;
              printCanvasElt.height = viewport.height * PRINT_UNITS;
              return page.render({
                canvasContext: printCanvasElt.getContext("2d"),
                transform: [
                  // Additional transform, applied just before viewport transform.
                  PRINT_UNITS,
                  0,
                  0,
                  PRINT_UNITS,
                  0,
                  0
                ],
                viewport: viewport,
                intent: "print"
              }).promise;
            })
          );
        }

        Promise.all(allPages)
          .then(function() {
            win.focus(); // Required for IE
            win.print();
            removeIframe();
          })
          .catch(function(err) {
            removeIframe();
            emitEvent("error", err);
          });
      });
  };

  this.renderPage = function(rotate) {
    if (pdfRender !== null) return pdfRender.cancel();
    if (pdfPage === null) return;
    if (rotate === undefined) rotate = 0;
    var viewport = pdfPage.getViewport(
      canvasElt.offsetWidth / pdfPage.getViewport(1).width,
      rotate
    );
    var devicePixelRatio = window.devicePixelRatio || 1;
    var pageWidth = viewport.width * devicePixelRatio;
    var pageHeight = viewport.height * devicePixelRatio;

    emitEvent("page-size", pageWidth, pageHeight);

    canvasElt.width = pageWidth;
    canvasElt.height = pageHeight;
    pdfRender = pdfPage.render({
      canvasContext: canvasElt.getContext("2d"),
      viewport: viewport
    });

    annotationLayerElt.style.visibility = "hidden";
    clearAnnotations();

    pdfPage.getAnnotations().then(function(annotations) {
      PDFJS.AnnotationLayer.render({
        viewport: viewport.clone({ dontFlip: true }),
        div: annotationLayerElt,
        annotations: annotations,
        page: pdfPage,
        //linkService: new LinkServiceMock(),
        renderInteractiveForms: false
      });
    });
    pdfRender
      .then(function() {
        annotationLayerElt.style.visibility = "";
        pdfRender = null;
      })
      .catch(
        function(err) {
          pdfRender = null;
          if (err === "cancelled") return this.renderPage(rotate);
          emitEvent("error", err);
        }.bind(this)
      );
  };
  this.forEachPage = function(pageCallback) {
    var numPages = pdfDoc.pdfInfo.numPages;
    (function next(pageNum) {
      pdfDoc
        .getPage(pageNum)
        .then(pageCallback)
        .then(function() {
          if (++pageNum <= numPages) next(pageNum);
        });
    })(1);
  };
  this.loadPage = function(pageNumber, rotate) {
    pdfPage = null;

    if (pdfDoc === null) return;

    pdfDoc
      .getPage(pageNumber)
      .then(
        function(page) {
          pdfPage = page;
          this.renderPage(rotate);
          emitEvent("page-loaded", page.pageNumber);
        }.bind(this)
      )
      .catch(function(err) {
        clearCanvas();
        clearAnnotations();
        emitEvent("error", err);
      });
  };
  this.loadDocument = function(src) {
    pdfDoc = null;
    pdfPage = null;

    emitEvent("num-pages", undefined);
    if (!src) {
      canvasElt.removeAttribute("width");
      canvasElt.removeAttribute("height");
      clearAnnotations();
      return;
    }

    if (isPDFDocumentLoadingTask(src)) {
      var loadingTask = src;
    } else {
      var loadingTask = createLoadingTask(src, {
        onPassword: function(updatePassword, reason) {
          var reasonStr;
          switch (reason) {
            case PDFJS.PasswordResponses.NEED_PASSWORD:
              reasonStr = "NEED_PASSWORD";
              break;
            case PDFJS.PasswordResponses.INCORRECT_PASSWORD:
              reasonStr = "INCORRECT_PASSWORD";
              break;
          }
          emitEvent("password", updatePassword, reasonStr);
        },
        onProgress: function(status) {
          var ratio = status.loaded / status.total;
          emitEvent("progress", Math.min(ratio, 1));
        }
      });
    }

    loadingTask
      .then(function(pdf) {
        pdfDoc = pdf;
        emitEvent("num-pages", pdf.numPages);
        emitEvent("loaded");
      })
      .catch(function(err) {
        clearCanvas();
        clearAnnotations();
        emitEvent("error", err);
      });
  };

  annotationLayerElt.style.transformOrigin = "0 0";
}
const pdf = {
  createLoadingTask,
  render(h) {
    return h(
      "div",
      {
        attrs: {
          style: "position: relative"
        }
      },
      [
        h("canvas", {
          style: {
            display: "block",
            width: "100%"
          }
        }),
        h("div", {
          class: "annotationLayer"
        }),
        h(resizeSensor, {
          props: {
            initial: true
          },
          on: {
            resize: this.resize
          }
        })
      ]
    );
  },
  props: {
    src: {
      type: [String, Object],
      default: ""
    },
    page: {
      type: Number,
      default: 1
    },
    rotate: {
      type: Number,
      default: 0
    }
  },
  watch: {
    src: function() {
      this.pdf.loadDocument(this.src);
    },
    page: function() {
      this.pdf.loadPage(this.page, this.rotate);
    },
    rotate: function() {
      this.pdf.renderPage(this.rotate);
    }
  },
  methods: {
    resize: function(size) {
      var canvasElt = this.$el.childNodes[0];
      var annotationLayerElt = this.$el.childNodes[1];
      // on IE10- canvas height must be set
      canvasElt.style.height =
        canvasElt.offsetWidth * (canvasElt.height / canvasElt.width) + "px";
      // update the page when the resolution is too poor
      var resolutionScale = this.pdf.getResolutionScale();

      if (resolutionScale < 0.85 || resolutionScale > 1.15)
        this.pdf.renderPage(this.rotate);
      annotationLayerElt.style.transform = "scale(" + resolutionScale + ")";
    },
    print: function(dpi, pageList) {
      this.pdf.printPage(dpi, pageList);
    }
  },
  mounted: function() {
    var canvasElt = this.$el.childNodes[0];
    var annotationLayerElt = this.$el.childNodes[1];

    this.pdf = new PDFJSWrapper(
      PDFJS,
      canvasElt,
      annotationLayerElt,
      this.$emit.bind(this)
    );

    this.$on("loaded", function() {
      this.pdf.loadPage(this.page, this.rotate);
    });

    this.$on("page-size", function(width, height) {
      canvasElt.style.height = canvasElt.offsetWidth * (height / width) + "px";
    });

    this.pdf.loadDocument(this.src);
  },
  destroyed: function() {
    this.pdf.destroy();
  }
};
export default {
  props: {
    src: String
  },
  data() {
    return {
      page: 1,
      numPages: 0
      // archivo: "https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"
    };
  },
  template: "#main",
  components: {
    pdf: pdf
  },
  mounted() {
    var self = this;
    $(".touchspin")
      .TouchSpin({
        // verticalbuttons: true,
        buttondown_class: "btn btn-white",
        buttonup_class: "btn btn-white",
        min: 1,
        max: function() {
          console.log(self.numPages);
          return self.numPages;
        }
      })
      .on("change", function() {
        self.page = $("#page").val() * 1;
      })
      .attr("min", "1")
      .attr("max", self.numPages);
  },
  watch: {
    page: function(val) {
      if (val > this.numPages) {
        this.page = this.numPages;
      }
    }
  }
};
</script>

