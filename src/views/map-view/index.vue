<template>
  <div id="olMap">
    <div ref="main-map" class="mapContainer" id="main-map"></div>
  </div>
</template>

<script lang="ts">
  import 'ol/ol.css';
  import 'ol-layerswitcher/dist/ol-layerswitcher.css';
  import 'ol-ext/dist/ol-ext.css';
  import { Map, View } from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import VectorLayer from 'ol/layer/Vector';
  import LayerGroup from 'ol/layer/Group';
  import { BingMaps as BingMapsSource, XYZ as XYZSource, Vector as VectorSource, OSM } from 'ol/source';
  import { Feature } from 'ol';
  import { Point, Polygon } from 'ol/geom';
  import GeoJSON from 'ol/format/GeoJSON';
  import LayerSwitcher from 'ol-layerswitcher';
  import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
  import { Select } from 'ol/interaction';
  import Popup from 'ol-ext/overlay/Popup';
  import SearchFeature, { Options as SearchFeatureOptions } from '/@/assets/ol-ext/SearchFeature';
  import { Style, Stroke, Circle, RegularShape, Fill, Icon } from 'ol/style';
  import Legend from 'ol-ext/legend/Legend';
  import LegendControl from 'ol-ext/control/Legend';
  import Zoom from 'ol-ext/featureAnimation/Zoom';
  import { easeOut, upAndDown } from 'ol/easing';
  import { transform as projTransform } from 'ol/proj';
  import olLegendItemOptions from 'ol-ext/legend/Item';

  let map;
  let dataSource;
  let projectLayer;
  let homeLayer;
  let pointStyleToStudent;
  let pointStyleToFaculty;
  let iconStyle;
  let select;
  const logoUrl = '/logo.png';
  const jsonUrl = '/research_final.json';

  export default {
    name: 'OlMap',
    data() {
      return {};
    },
    mounted() {
      map = new Map({
        target: 'main-map',
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      dataSource = new VectorSource({
        url: jsonUrl,
        // projection: 'EPSG:4326',
        format: new GeoJSON(),
      });
      // point style: student
      pointStyleToStudent = new Style({
        image: new Circle({
          radius: 5, //半径
          fill: new Fill({
            //填充样式
            color: '#ff6688',
          }),
        }),
        stroke: new Stroke({
          //边界样式
          color: '#555555',
          width: 1,
        }),
      });
      // point style: faculty
      pointStyleToFaculty = new Style({
        image: new Circle({
          radius: 5, //半径
          fill: new Fill({
            //填充样式
            color: '#3d54c9',
          }),
        }),
        stroke: new Stroke({
          //边界样式
          color: '#555555',
          width: 1,
        }),
      });
      // icon style
      iconStyle = new Style({
        image: new Icon({
          opacity: 0.75,
          size: [256, 256],
          scale: 0.08,
          src: logoUrl,
        }),
      });
      // iconStyle = new Style({
      //   image: new RegularShape({
      //     radius: 5,
      //     points: 4,
      //     stroke: new Stroke({ color: 'red', width: 2 }),
      //   }),
      // });

      // pulse
      this.pulsePoint([-105.265946, 40.007582]);
      // init base map
      this.baseMapLayerInit();
      // init data map
      this.dataMapLayerInit();
      // Layer switcher
      const layerSwitcher = new LayerSwitcher({
        reverse: true,
        groupSelectStyle: 'group',
      });
      map.addControl(layerSwitcher);
      // Popup
      this.popupInit();
      // search
      this.searchInit();
      // legend
      this.legendInit();
    },
    methods: {
      baseMapLayerInit() {
        const osm = new TileLayer({
          title: 'OSM',
          type: 'base',
          visible: true,
          source: new OSM(),
        } as BaseLayerOptions);

        const osmTerrain = new TileLayer({
          title: 'OSM terrain',
          type: 'base',
          visible: false,
          source: new OSM({
            url: 'http://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png', //osm地形
          }),
        } as BaseLayerOptions);

        const bingMaps = new TileLayer({
          title: 'Bing Maps',
          type: 'base',
          visible: false,
          source: new BingMapsSource({
            key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
            imagerySet: 'Road',
          }),
        } as BaseLayerOptions);

        const bingMapsAerial = new TileLayer({
          title: 'Bing Maps aerial',
          type: 'base',
          visible: false,
          source: new BingMapsSource({
            key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
            imagerySet: 'AerialWithLabelsOnDemand',
          }),
        } as BaseLayerOptions);

        const arcgisSatellite = new TileLayer({
          // A layer must have a title to appear in the layerswitcher
          title: 'ArcGIS satellite',
          type: 'base',
          visible: false,
          source: new XYZSource({
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          }),
        } as BaseLayerOptions);

        // Base map layer group
        const baseMaps = new LayerGroup({
          title: 'Base maps',
          layers: [osmTerrain, osm, bingMapsAerial, bingMaps, arcgisSatellite],
        } as GroupLayerOptions);
        map.addLayer(baseMaps);
      },
      dataMapLayerInit() {
        // GeoJSON layer
        projectLayer = new VectorLayer({
          title: 'Research projects',
          visible: true,
          source: dataSource,
          style: function (feature /*, resolution*/) {
            const bFaculty = feature.get('faculty');
            if (bFaculty == 'y') {
              return [pointStyleToFaculty];
            }
            return [pointStyleToStudent];
          },
        } as BaseLayerOptions);

        // CU Boulder Layer
        const vectorSource = new VectorSource({});
        //icon feature
        const iconFeature = new Feature({
          geometry: new Point([-105.265946, 40.007582], 'XY').transform('EPSG:4326', 'EPSG:3857'),
        });
        iconFeature.set('name', 'CU Boulder');
        iconFeature.set(
          'description',
          'The University of Colorado Boulder (CU Boulder) is a public research university located in Boulder, Colorado, United States. It was founded in 1876 and is part of the University of Colorado system. CU Boulder has a student body of over 33,000 students and is one of the largest universities in the state of Colorado.',
        );
        iconFeature.set('Supporting_Faculty', '');
        vectorSource.addFeature(iconFeature);
        // CU Boulder layer
        homeLayer = new VectorLayer({
          title: 'CU Boulder',
          visible: true,
          source: vectorSource,
          style: iconStyle,
        } as BaseLayerOptions);
        // Data map layer group
        const dataMaps = new LayerGroup({
          title: 'Overlays',
          // Adding a 'fold' property set to either 'open' or 'close' makes the group layer
          // collapsible
          fold: 'open',
          layers: [projectLayer, homeLayer],
        } as GroupLayerOptions);
        map.addLayer(dataMaps);
      },
      popupInit() {
        // Popup overlay
        const popup = new Popup({
          popupClass: 'default anim', //"tooltips", "warning" "black" "default", "tips", "shadow",
          closeBox: true,
          onshow: function () {
            // console.log('You opened the box');
          },
          onclose: function () {
            // console.log('You close the box');
          },
          positioning: 'center-left',
          anim: true,
          autoPan: {
            animation: {
              duration: 250,
            },
          },
          // autoPanAnimation: { duration: 250 }
        });

        map.addOverlay(popup);

        // Control Select
        select = new Select({});
        map.addInteraction(select);

        // On selected => show/hide popup
        select.getFeatures().on('add', function (e) {
          const feature = e.element;
          console.log(feature.getGeometry());
          console.log(feature.getProperties);
          let content = `<table class="style-table"><tbody>
          <tr><td class="active-row">Name</td><td>${feature.get('name')}</td></tr>
          <tr><td class="active-row">Research Summary</td><td>${feature.get('description')}</td></tr>`;
          const sptFaculty = feature.get('Supporting_Faculty');
          if (sptFaculty != '') {
            content += `<tr><td class="active-row">Supporting Faculty</td><td>${feature.get('Supporting_Faculty')}</td></tr>`;
          }
          content += `</tbody><colgroup><col><col></colgroup></table>`;

          const f = feature as Feature<Polygon>;
          popup.show(f.getGeometry()?.getFirstCoordinate(), content);
        });
        select.getFeatures().on('remove', function (/*e*/) {
          popup.hide();
        });
      },
      searchInit() {
        // Set the control grid reference
        const search = new SearchFeature({
          //target: $(".options").get(0),\o9
          // source: dataSource,
          placeholder: 'Search PI name',
          property: 'name',
          maxHistory: 3,
          noCollapse: true,
          // sort: function (f1, f2) {
          //   if (search.getSearchString(f1) < search.getSearchString(f2)) return -1;
          //   if (search.getSearchString(f1) > search.getSearchString(f2)) return 1;
          //   return 0;
          // },
        } as SearchFeatureOptions);
        search.setSource(dataSource);
        map.addControl(search);
        // Select feature when click on the reference index
        search.on('select', function (e) {
          select.getFeatures().clear();
          select.getFeatures().push(e.search);
          const p = e.search.getGeometry().getFirstCoordinate();
          map.getView().animate({ center: p });
        });
      },
      legendInit() {
        // Define a new legend
        const legend = new Legend({
          title: 'Legend',
          margin: 5,
          maxWidth: 300,
        });
        const legendCtrl = new LegendControl({
          legend: legend,
          collapsed: false,
        });
        map.addControl(legendCtrl);

        // New legend associated with a layer
        const dataLegend = new Legend({ layer: projectLayer, margin: 4 });
        dataLegend.addItem({ title: 'Principal Investigator (PI)' } as unknown as olLegendItemOptions);
        dataLegend.addItem({
          title: 'Faculty',
          typeGeom: 'Point',
          style: pointStyleToFaculty,
        } as unknown as olLegendItemOptions);

        dataLegend.addItem({
          title: 'Graduate Student',
          typeGeom: 'Point',
          style: pointStyleToStudent,
        } as unknown as olLegendItemOptions);

        legend.addItem(dataLegend as unknown as olLegendItemOptions);

        // CU Boulder legend
        const homeLegend = new Legend({ layer: homeLayer, margin: 4 });
        homeLegend.addItem({ title: 'University Location' } as unknown as olLegendItemOptions);
        homeLegend.addItem({
          title: 'CU Boulder',
          typeGeom: 'Point',
          style: iconStyle,
        } as unknown as olLegendItemOptions);

        legend.addItem(homeLegend as unknown as olLegendItemOptions);
      },
      pulsePoint(lonlat) {
        // Pulse feature at coord
        function pulseFeature(coord) {
          var f = new Feature(new Point(coord));
          f.setStyle(
            new Style({
              image: new RegularShape({
                radius: 40,
                points: 4,
                stroke: new Stroke({ color: 'red', width: 2 }),
              }),
            }),
          );
          map.animateFeature(
            f,
            new Zoom({
              fade: easeOut,
              duration: 3000,
              easing: upAndDown,
            }),
          );
        }
        // Pulse at lonlat
        function pulse(lonlat) {
          var nb = 3;
          for (var i = 0; i < nb; i++) {
            setTimeout(function () {
              pulseFeature(projTransform(lonlat, 'EPSG:4326', map.getView().getProjection()));
            }, i * 1000);
          }
        }
        pulse(lonlat);
      },
    },
  };
</script>

<style>
  #main-map {
    width: 100vw;
    height: 100vh;
    border: 2px;
  }

  .ol-zoom {
    top: 1em;
    left: 1em;
  }

  .ol-search {
    top: 1em;
    left: 3.5em;
  }

  .ol-popup {
    max-width: 400px;
    min-width: 100px;
    min-height: 1em;
    user-select: text;
  }

  .style-table {
    border-collapse: collapse;

    /* margin: 50px auto; */
    font-size: 1em;

    /* max-width: 400px; */

    /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); */
  }

  .style-table thead tr {
    background-color: #0398dd;
    color: #fff;
    text-align: left;
  }

  .style-table th,
  .style-table td {
    padding: 12px 15px;
  }

  .style-table tbody tr {
    border-bottom: 1px solid #ddd;
  }

  /* .style-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3a3;
  } */

  .style-table tbody tr:last-of-type {
    /* border-bottom: 2px solid #0398dd; */
  }

  .style-table tbody td.active-row {
    font-weight: bold;
    font-size: 1.1em;
    color: #0398dd;
  }
</style>
