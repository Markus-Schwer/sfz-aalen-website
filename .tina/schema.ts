import { defineSchema, TinaField } from "@tinacms/cli";

const header: TinaField = {
  label: "Überschrift",
  name: "header",
  type: "object",
  required: true,
  fields: [
    {
      label: "Haupt-Überschrift",
      name: "mainHeader",
      type: "string"
    },
    {
      label: "Unter-Überschrift",
      name: "subHeader",
      type: "string"
    },
    {
      label: "Trennstrich",
      name: "divider",
      type: "boolean"
    }
  ]
};

export default defineSchema({
  collections: [
    {
      label: "Seiten",
      name: "pages",
      path: "content/pages",
      fields: [
        {
          label: "Breadcrumbs",
          name: "breadcrumbs",
          type: "string",
          list: true
        },
        {
          label: "Logo scroll Effect",
          name: "logoScrollEffect",
          type: "boolean"
        },
        {
          type: "image",
          label: "Titelbild",
          name: "coverImages",
          list: true
        },
        {
          type: "object",
          label: "Motto",
          name: "motto",
          list: true,
          fields: [
            {
              type: "string",
              label: "Text",
              name: "mottoText"
            },
            {
              type: "string",
              label: "Farbe",
              name: "color",
              options: ["primary", "secondary", "tertiary"]
            },
            {
              type: "string",
              label: "Größe",
              name: "size",
              options: ["small", "medium", "big"]
            }
          ]
        },
        {
          type: "object",
          label: "Seiten Abschnitte",
          name: "pageSections",
          list: true,
          templates: [
            {
              label: "Große Überschrift",
              name: "bigHeader",
              fields: [
                {
                  label: "Überschrift",
                  name: "headerText",
                  type: "string"
                }
              ]
            },
            {
              label: "Überschrift",
              name: "headerOnlySection",
              fields: [
                header
              ]
            },
            {
              label: "Abschnitt mit zwei Spalten",
              name: "twoColumnSection",
              fields: [
                header,
                {
                  label: "Hintergrundfarbe",
                  name: "backgroundColor",
                  type: "string",
                  ui: {
                    component: "color",
                    colorFormat: "hex"
                  }
                },
                {
                  label: "Spalten",
                  name: "columns",
                  type: "object",
                  list: true,
                  required: true,
                  templates: [
                    {
                      label: "Bild",
                      name: "picture",
                      fields: [
                        {
                          label: "Bild",
                          name: "picture",
                          type: "image",
                          required: true
                        },
                        {
                          label: "Alt Text",
                          name: "altText",
                          type: "string"
                        },
                        {
                          label: "Breite",
                          name: "width",
                          type: "number",
                          required: true
                        },
                        {
                          label: "Höhe",
                          name: "height",
                          type: "number",
                          required: true
                        }
                      ]
                    },
                    {
                      label: "Paragraph",
                      name: "paragraph",
                      fields: [
                        {
                          label: "Paragraph",
                          name: "paragraph",
                          type: "string",
                          required: true,
                          ui: {
                            component: "markdown"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: "Abschnitt mit Icon Blasen",
              name: "iconBubbleSection",
              fields: [
                {
                  label: "Anzahl Spalten",
                  name: "numberColumns",
                  type: "number"
                },
                {
                  label: "Blasen",
                  name: "bubbles",
                  type: "object",
                  list: true,
                  required: true,
                  fields: [
                    {
                      label: "Text",
                      name: "text",
                      type: "string"
                    },
                    {
                      label: "Icon",
                      name: "icon",
                      type: "image"
                    },
                    {
                      label: "Hintergrundfarbe",
                      name: "backgroundColor",
                      type: "string",
                      required: true,
                      options: ["primary", "secondary", "tertiary"]
                    },
                    {
                      label: "Link",
                      name: "href",
                      type: "string",
                      required: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    },
  ],
});
