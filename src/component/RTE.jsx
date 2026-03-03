import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

//  Here We Might Wondering WHAT is these RTE EDITOR THING AND ALL BUT ACTALYY WE USE THESE FOR THE
//  IMAGINE USER WANTS TO POST SOMETHING VERY IMPORTANT WE WNAT TO HIGHLIHGHT SOMETHING THEN COMES THE SAVIOUR

// Oaky Here lets Analyse How the Control Flow happening 

//  STEP1 GO SEE THE POSTCARD FOLDER WHERE I WILL BE CONNECTING THE rte with the PRESENT ONE
// CONTROL YOU ARE pASSING hEERE IS wHICH cOMING fROM THE useform 
// contrl knows the value updated value validate Values
// controller as name which will be registerd with input values
// cONTROLLER PASS CONTENT tHING and then   formstate create content filed as state 
// 
export default function RTE({ name, control, label, defualtValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defualtValue}
            init={{
              initialValue: defualtValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
