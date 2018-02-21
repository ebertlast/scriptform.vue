<template>
  <div>
    <div class="text-center pdf-toolbar">
      <div class="btn-group">
        <button id="print" class="btn btn-white" @click="imprimirPDF" title="Imprimir PDF">
          <i class="fa fa-print"></i>
          <span class="hidden-xs hide">Imp</span>
        </button>
        <button id="print" class="btn btn-white" @click="descargarPDF" title="Descargar PDF">
          <i class="fa fa-download"></i>
        </button>
        <button id="prev" class="btn btn-white" @click="onPrevPage" title="Página Anterior">
          <i class="fa fa-long-arrow-left"></i>
          <span class="hidden-xs">Ant</span>
        </button>
        <button id="next" class="btn btn-white" @click="onNextPage" title="Página Siguiente">
          <i class="fa fa-long-arrow-right"></i>
          <span class="hidden-xs">Sig</span>
        </button>
        <button id="zoomin" class="btn btn-white" @click="onZoomIn" title="Acercar">
          <i class="fa fa-search-plus"></i>
          <span class="hidden-xs">Acercar</span>
        </button>
        <button id="zoomout" class="btn btn-white" @click="onZoomOut" title="Alejar">
          <i class="fa fa-search-minus"></i>
          <span class="hidden-xs">Alejar</span>
        </button>
        <button id="zoomfit" class="btn btn-white" @click="onZoomFit" title="Vista completa"> 100%</button>
        <span class="btn btn-white hidden-xs">Pág: </span>

        <div class="input-group">
          <input type="text" class="form-control" id="page_num" v-model="pageNum" title="Página">

          <div class="input-group-btn">
            <button type="button" class="btn btn-white" id="page_count">/ {{numPages}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center m-t-md">
      <canvas id="the-canvas" class="pdfcanvas border-left-right border-top-bottom b-r-md"></canvas>
    </div>

    <canvas id="the-canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: ["archivoid", "sticker"],
  data() {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 1.5,
      canvas: undefined,
      ctx: undefined,
      numPages: 0,
      currentPage: 0,
      zoomRange: 0.25,
      buffer: undefined
    };
  },
  mounted() {
    this.canvas = document.getElementById("the-canvas");
    this.ctx = this.canvas.getContext("2d");
    var self = this;
    $("#page_num").on("change", function() {
      var pageNumber = Number($(this).val());
      if (pageNumber > 0 && pageNumber <= self.numPages) {
        self.queueRenderPage(pageNumber, self.scale);
      }
    });
    this.renderPDF();
  },
  methods: {
    imprimirPDF() {
      var self = this;
      var byteArray = new Uint8Array(self.buffer);
      var blob = new Blob([byteArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const win = window.open();
      win.document.write(
        '<iframe width="100%" height="100%" src="' +
          url +
          '" frameborder="0" allowfullscreen></iframe>'
      );
    },
    descargarPDF() {
      var self = this;
      var byteArray = new Uint8Array(self.buffer);
      var blob = new Blob([byteArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${this.sticker}.pdf`);
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        true,
        window,
        1,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      link.dispatchEvent(event);
    },

    /**
     * Asynchronously downloads PDF.
     */
    renderPDF() {
      var self = this;
      self.$http.get(`archivos/descargar/${self.archivoid}`).then(data => {
        self.buffer = data.result.recordset[0].ARCHIVO.data;
        PDFJS.getDocument({ data: self.buffer }).then(function(pdfDoc_) {
          self.pdfDoc = pdfDoc_;
          self.numPages = self.pdfDoc.numPages;

          // Initial/first page rendering
          self.renderPage(self.pageNum);
        });
      });
    },

    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    renderPage(num, scale = this.scale) {
      var self = this;
      self.pageRendering = true;
      // Using promise to fetch the page
      self.pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(scale);
        self.canvas.height = viewport.height;
        self.canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: self.ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function() {
          self.pageRendering = false;
          if (self.pageNumPending !== null) {
            // New page rendering is pending
            self.renderPage(self.pageNumPending);
            self.pageNumPending = null;
          }
        });
      });

      // Update page counters
      // document.getElementById("page_num").textContent = num;
      self.currentPage = num;
    },

    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },

    /**
     * Displays next page.
     */
    onNextPage() {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    },

    /**
     * Displays previous page.
     */
    onPrevPage() {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },

    /**
     * Zoom in page.
     */
    onZoomIn() {
      var self = this;
      // if (self.scale >= self.pdfDoc.scale) {
      //   return;
      // }
      self.scale += self.zoomRange;
      var num = self.pageNum;
      self.renderPage(num, self.scale);
    },

    /**
     * Zoom out page.
     */
    onZoomOut() {
      var self = this;
      self.scale -= self.zoomRange;
      var num = self.pageNum;
      self.renderPage(num, self.scale);
    },
    /**
     * Zoom fit page.
     */
    onZoomFit() {
      var self = this;
      self.scale = 1;
      var num = self.pageNum;
      self.queueRenderPage(num, self.scale);
    }
  },
  watch: {
    archivoid() {
      this.pageNum = 1;
      // this.$http.get(`archivos/descargar/${this.archivoid}`).then(data => {
      //   var buffer = data.result.recordset[0].ARCHIVO.data;
      //   this.renderPDF(buffer);
      // });
      this.renderPDF();
    }
  }
};
</script>
