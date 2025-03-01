import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createGuitarAction } from "@/utils/actions";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import CheckboxInput from "@/components/form/CheckBoxInput";

function CreateGuitarPage() {
  const model = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section suppressHydrationWarning>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create guitar</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createGuitarAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              model="model"
              label="product name"
              defaultValue={model}
            />
            <FormInput
              type="text"
              model="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="featured" />
          </div>

          <SubmitButton text="Create Guitar" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateGuitarPage;
