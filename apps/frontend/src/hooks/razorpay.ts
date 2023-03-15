export const displayRazorpay = async (data:any, handler: (data: any) => void) => {

    const options = {
        key: 'rzp_test_pUg2xRewKzUpHC',
        currency: data.currency,
        amount: data.amount,
        name: data.name,
        description: "Packing And Moving",
        image: data.image,
        handler: function (response: any) {
            handler(response)
        },

        prefill: {
            name: data.userName,
            email: data.email,
            contact: data.phone,
        },
    };
    const _window: any = window;
    const paymentObject = await _window.Razorpay(options);
    await paymentObject.open();
}

export const loadScript = (src: string) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};