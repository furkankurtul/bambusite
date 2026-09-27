"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileUp, Upload, X } from "lucide-react";
import { createCustomPrintRequest } from "@/lib/custom-print/submitRequest";
import type { ProductMaterial } from "@/types/product";

const ACCEPTED_FILE_EXTENSIONS = ["stl", "3mf", "obj", "step"] as const;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  description: string;
  quantity: string;
  color: string;
  material: string;
  dimensions: string;
};

type FormField = keyof FormValues | "file";
type FormErrors = Partial<Record<FormField, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  description: "",
  quantity: "1",
  color: "",
  material: "",
  dimensions: "",
};

export function CustomPrintRequestForm({
  materials,
}: {
  materials: readonly ProductMaterial[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoComplete, setIsDemoComplete] = useState(false);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateFile(file: File | null) {
    if (!file) {
      return undefined;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    return extension &&
      ACCEPTED_FILE_EXTENSIONS.includes(
        extension as (typeof ACCEPTED_FILE_EXTENSIONS)[number],
      )
      ? undefined
      : "Choose an STL, 3MF, OBJ, or STEP file.";
  }

  function setFile(file: File | null) {
    const fileError = validateFile(file);
    setSelectedFile(fileError ? null : file);
    setErrors((current) => ({ ...current, file: fileError }));
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) nextErrors.name = "Enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (values.description.trim().length < 10) {
      nextErrors.description =
        "Describe your project in at least 10 characters.";
    }
    if (!/^\d+$/.test(values.quantity) || Number(values.quantity) < 1) {
      nextErrors.quantity = "Enter a quantity of at least 1.";
    }
    if (!values.material) nextErrors.material = "Choose a preferred material.";

    const fileError = validateFile(selectedFile);
    if (fileError) nextErrors.file = fileError;

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await createCustomPrintRequest({
      ...values,
      attachmentName: selectedFile?.name,
      quantity: Number(values.quantity),
      material: values.material as ProductMaterial,
    });
    setIsSubmitting(false);
    setIsDemoComplete(true);
  }

  function resetDemo() {
    setValues(initialValues);
    setSelectedFile(null);
    setErrors({});
    setIsDemoComplete(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (isDemoComplete) {
    return (
      <section
        aria-labelledby="demo-complete"
        className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-10"
      >
        <CheckCircle2
          aria-hidden="true"
          className="size-10 text-zinc-950"
          strokeWidth={1.5}
        />
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Demo complete
        </p>
        <h2
          id="demo-complete"
          className="mt-3 text-3xl font-semibold tracking-[-0.04em]"
        >
          Your request is ready for review.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          This is a preview of the request flow. No project details or files
          have been sent or stored yet.
        </p>
        <button
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          type="button"
          onClick={resetDemo}
        >
          Start another demo request
        </button>
      </section>
    );
  }

  return (
    <form
      className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="border-b border-zinc-200 pb-6">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">
          Tell us about your project
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Fields marked with <span aria-hidden="true">*</span>
          <span className="sr-only">an asterisk</span> are required for this
          demo.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} htmlFor="name">
          <input
            autoComplete="name"
            className={inputClass(errors.name)}
            id="name"
            name="name"
            onChange={(event) => updateValue("name", event.target.value)}
            value={values.name}
            {...describedBy(errors.name, "name")}
          />
        </Field>
        <Field label="Email" required error={errors.email} htmlFor="email">
          <input
            autoComplete="email"
            className={inputClass(errors.email)}
            id="email"
            name="email"
            type="email"
            onChange={(event) => updateValue("email", event.target.value)}
            value={values.email}
            {...describedBy(errors.email, "email")}
          />
        </Field>
        <Field label="Phone" hint="Optional" htmlFor="phone">
          <input
            autoComplete="tel"
            className={inputClass()}
            id="phone"
            name="phone"
            type="tel"
            onChange={(event) => updateValue("phone", event.target.value)}
            value={values.phone}
          />
        </Field>
        <Field
          label="Quantity"
          required
          error={errors.quantity}
          htmlFor="quantity"
        >
          <input
            className={inputClass(errors.quantity)}
            id="quantity"
            inputMode="numeric"
            min="1"
            name="quantity"
            onChange={(event) => updateValue("quantity", event.target.value)}
            type="number"
            value={values.quantity}
            {...describedBy(errors.quantity, "quantity")}
          />
        </Field>
        <Field label="Preferred color" hint="Optional" htmlFor="color">
          <input
            className={inputClass()}
            id="color"
            name="color"
            placeholder="For example, matte black"
            onChange={(event) => updateValue("color", event.target.value)}
            value={values.color}
          />
        </Field>
        <Field
          label="Preferred material"
          required
          error={errors.material}
          htmlFor="material"
        >
          <select
            className={inputClass(errors.material)}
            id="material"
            name="material"
            onChange={(event) => updateValue("material", event.target.value)}
            value={values.material}
            {...describedBy(errors.material, "material")}
          >
            <option value="">Choose a material</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Approximate dimensions"
          hint="Optional"
          htmlFor="dimensions"
        >
          <input
            className={inputClass()}
            id="dimensions"
            name="dimensions"
            placeholder="For example, 120 × 80 × 40 mm"
            onChange={(event) => updateValue("dimensions", event.target.value)}
            value={values.dimensions}
          />
        </Field>
        <div className="hidden sm:block" aria-hidden="true" />
        <Field
          className="sm:col-span-2"
          label="Project description"
          required
          error={errors.description}
          htmlFor="description"
        >
          <textarea
            className={`${inputClass(errors.description)} min-h-32 resize-y`}
            id="description"
            name="description"
            onChange={(event) => updateValue("description", event.target.value)}
            placeholder="What would you like to print? Include its purpose, any important measurements, and details that matter."
            value={values.description}
            {...describedBy(errors.description, "description")}
          />
        </Field>
      </div>

      <div className="mt-7">
        <label
          className="text-sm font-semibold text-zinc-950"
          htmlFor="project-file"
        >
          Model file{" "}
          <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <div
          className={`mt-2 rounded-lg border border-dashed p-5 sm:p-6 ${errors.file ? "border-red-600 bg-red-50" : "border-zinc-300 bg-[#f7f7f5]"}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            setFile(event.dataTransfer.files.item(0));
          }}
        >
          <input
            ref={fileInputRef}
            accept=".stl,.3mf,.obj,.step"
            className="sr-only"
            id="project-file"
            name="project-file"
            type="file"
            onChange={(event) => setFile(event.target.files?.item(0) ?? null)}
            aria-describedby={
              errors.file ? "project-file-error" : "project-file-help"
            }
          />
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white text-zinc-950">
                <FileUp
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-950">
                  {selectedFile ? selectedFile.name : "Attach a model file"}
                </p>
                <p
                  id="project-file-help"
                  className="mt-1 text-sm text-zinc-600"
                >
                  STL, 3MF, OBJ, or STEP
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:border-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload aria-hidden="true" className="size-4" />
                Choose file
              </button>
              {selectedFile ? (
                <button
                  aria-label="Remove selected file"
                  className="inline-flex size-10 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                  type="button"
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {errors.file ? (
          <p
            id="project-file-error"
            className="mt-2 text-sm text-red-700"
            role="alert"
          >
            {errors.file}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-6 text-zinc-600">
          Submitting this form only displays a demo confirmation. It does not
          send or store your information.
        </p>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-wait disabled:bg-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Preparing demo…" : "Preview request"}
        </button>
      </div>
    </form>
  );
}

function Field({
  children,
  className,
  error,
  hint,
  htmlFor,
  label,
  required,
}: {
  children: React.ReactNode;
  className?: string;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-zinc-950" htmlFor={htmlFor}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {hint ? (
          <span className="font-normal text-zinc-500"> ({hint})</span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="mt-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(error: string | undefined, field: string) {
  return error
    ? { "aria-describedby": `${field}-error`, "aria-invalid": true }
    : undefined;
}

function inputClass(error?: string) {
  return `min-h-11 w-full rounded-md border bg-white px-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/15 ${error ? "border-red-600" : "border-zinc-300"}`;
}
