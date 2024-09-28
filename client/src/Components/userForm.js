import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const DocumentForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },

    control,
  } = useForm({
    defaultValues: {
      documents: [
        { fileName: "", fileType: "", file: "" },
        { fileName: "", fileType: "", file: "" },
      ],
    },
  });

  const [sameAsResidential, setSameAsResidential] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("dob", data.dob);
    formData.append(
      "residentialAddress[street1]",
      data.residentialAddress.street1
    );
    formData.append(
      "residentialAddress[street2]",
      data.residentialAddress.street2
    );

    if (!sameAsResidential) {
      formData.append(
        "permanentAddress[street1]",
        data.permanentAddress.street1
      );
      formData.append(
        "permanentAddress[street2]",
        data.permanentAddress.street2
      );
    }

    data.documents.forEach((document, index) => {
      if (document.file.length > 0) {
        formData.append(`documents[${index}][file]`, document.file[0]);
        formData.append(`documents[${index}][fileName]`, document.fileName);
        formData.append(`documents[${index}][fileType]`, document.fileType);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/users/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Success!",
        text: "Form submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }

    setIsLoading(false);
  };
  const validateFile = (file, fileType) => {
    const fileExtension = file[0]?.name.split(".").pop().toLowerCase();
    return fileExtension === fileType;
  };
  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Candidate Document Submission Form
        </h2>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              {...register("firstName", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">
                First name is required.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic">
                Last name is required.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">Email is required.</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              {...register("dob", {
                required: true,
                validate: (value) => {
                  const age =
                    new Date().getFullYear() - new Date(value).getFullYear();
                  return age >= 18 || "You must be at least 18 years old.";
                },
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="date"
            />
            {errors.dob && (
              <p className="text-red-500 text-xs italic">
                {errors.dob.message || "Date of birth is required."}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Residential Address (Street 1)
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register("residentialAddress.street1", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
            {errors.residentialAddress?.street1 && (
              <p className="text-red-500 text-xs italic">
                Residential street 1 is required.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Residential Address (Street 2)
            </label>
            <input
              {...register("residentialAddress.street2")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            onChange={(e) => setSameAsResidential(e.target.checked)}
            className="mr-2 leading-tight"
          />
          <label className="text-sm">Same as Residential Address</label>
        </div>

        {!sameAsResidential && (
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Permanent Address (Street 1)
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("permanentAddress.street1", {
                  required: !sameAsResidential,
                })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
              {errors.permanentAddress?.street1 && (
                <p className="text-red-500 text-xs italic">
                  Permanent street 1 is required.
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Permanent Address (Street 2)
              </label>
              <input
                {...register("permanentAddress.street2")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Documents<span className="text-red-500">*</span>
          </label>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-4 space-x-2">
              <div className="flex-1">
                <input
                  {...register(`documents.${index}.fileName`, {
                    required: true,
                  })}
                  placeholder="Document Name"
                  className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
                />
                {errors.documents?.[index]?.fileName && (
                  <p className="text-red-500 text-xs italic">
                    Document name is required.
                  </p>
                )}
              </div>

              <div className="flex-1">
                <select
                  {...register(`documents.${index}.fileType`, {
                    required: true,
                  })}
                  className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
                >
                  <option value="">Select File Type</option>
                  <option value="pdf">PDF</option>
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                </select>
                {errors.documents?.[index]?.fileType && (
                  <p className="text-red-500 text-xs italic">
                    File type is required.
                  </p>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  {...register(`documents.${index}.file`, {
                    required: true,
                    validate: (value) =>
                      validateFile(
                        value,
                        watch(`documents.${index}.fileType`)
                      ) || "Invalid file type",
                  })}
                  className="w-full text-gray-700 mb-2"
                />
                {errors.documents?.[index]?.file && (
                  <p className="text-red-500 text-xs italic">
                    {errors.documents?.[index]?.file.message}
                  </p>
                )}
              </div>

              {index === 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    append({ fileName: "", fileType: "", file: "" })
                  }
                  className="p-2 rounded-md text-green-600"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 rounded-md text-red-600"
                  disabled={fields.length <= 2}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          {errors.documents && (
            <p className="text-red-500 text-xs italic">
              At least two document uploads are required.
            </p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="loader" />
          </div>
        )}
      </form>
    </div>
  );
};

export default DocumentForm;
