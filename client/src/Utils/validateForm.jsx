export const validateForm = ({
    fullname,
    address,
    phonenumber,
    advance,
    fulldelivery_date,
    orderItems
}) => {

    const errors = {};
    if (!fullname?.trim()) {
        errors.fullname = "Please enter fullname";
    }
    if (!address?.trim()) {
        errors.address = "Please enter address";
    }
    if (!phonenumber?.trim()) {
        errors.phonenumber = "Please enter phone no.";
    }
    if (!/^[0-9+\-\s()]+$/.test(phonenumber)) 
    {
        errors.phonenumber = "Please enter a valid phone no.";
    }
    if (advance === "" || advance === null || advance === undefined || Number(advance) <= 0)
    {
        errors.advance = "Please enter advance amount";
    }
    if (Number(advance) < 0)
    {
        errors.advance = "Advance cannot be negative";
    }
    if(
        !fulldelivery_date?.year ||
        !fulldelivery_date?.month ||
        !fulldelivery_date?.day
    ) {
        errors.fulldelivery_date = "Please select delivery date";
    }

    if (!orderItems || orderItems.length === 0) 
    {
        errors.orderItems = "Please add at least one product";
    }

    const itemErrors = {};
    orderItems?.forEach((item, i) => {
        const rowErr = {};

        if (!item.product_id) {
            rowErr.product_id = i === 0
                ? "Please select at least one product"
                : `Please select a product for item ${i + 1}`;
        }
        if (!item.qty || Number(item.qty) <= 0) {
            rowErr.qty = `Please enter a valid quantity for item ${i + 1}`;
        }
        if (!item.price || Number(item.price) <= 0) {
            rowErr.price = `Please enter a valid price for item ${i + 1}`;
        }

        if (Object.keys(rowErr).length > 0) {
            itemErrors[i] = rowErr;
        }
    });

    if (Object.keys(itemErrors).length > 0) {
        errors.orderItems = errors.orderItems || "Please fix errors in the product table";
        errors.itemErrors = itemErrors; // { 0: { qty: "..." }, 2: { price: "..." } }
    }


    return errors;
};
export const validateproductForm = ({
    name,
    price,
    category_id,
    }) => {
        
    const errors = {};
    if (!name?.trim()) {
        errors.name = "Please enter Product name";
    }

    if (!price?.trim() && price !== 0) {
        errors.price = "Please enter price";
    }


    if (!category_id) {
        errors.category_id = "Please enter category";
    }

    return errors;
};

export const validateImage = (
    file,
    {
        required = true,
        maxSize = 2 * 1024 * 1024, // 2 MB
        allowedTypes = ["image/jpeg", "image/png", "image/webp"],
        minWidth = 0,
        minHeight = 0,
    } = {}
) => {
    // Required validation
    if (!file) {
        return required ? "Image is required." : "";
    }

    // File type validation
    if (!allowedTypes.includes(file.type)) {
        return "Only JPG, PNG, and WebP images are allowed.";
    }

    // File size validation
    if (file.size > maxSize) {
        return "Image size must be less than 2 MB.";
    }

    // Dimension validation
    if (minWidth || minHeight) {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
                if (img.width < minWidth || img.height < minHeight) {
                    resolve(
                        `Image dimensions must be at least ${minWidth} × ${minHeight}px.`
                    );
                } else {
                    resolve("");
                }
            };

            img.onerror = () => {
                resolve("Invalid image file.");
            };

            img.src = URL.createObjectURL(file);
        });
    }

    return "";
};

export const validateCategoryForm = ({
    name
    }) => {
        
    const errors = {};
    if (!name?.trim()) {
        errors.name = "Please enter Category name";
    }
    return errors;
};
export default validateForm;

