module DateSlider.Slider {

    export function create(options: DateSliderOptions): SliderInstance[] {
        if (!options.sliders) {
            throw new Error("Cannot create sliders because options.sliders is not set.");
        }
        let sliders: SliderInstance[] = [];
        for (let sliderOptions of options.sliders) {
            sliders.push(new SliderInstance(sliderOptions));
        }
        return sliders;
    }
}
