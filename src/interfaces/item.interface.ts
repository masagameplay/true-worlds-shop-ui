import {FireworkEffectInterface} from "interfaces/firework-effect.interface";
import {FishPatternType} from "interfaces/fish-pattern-type.enum";
import {BannerPatternInterface} from "interfaces/banner-pattern.interface";

export interface ItemInterface {
    type: string;
    tag: string;
    name?: string;
    lore?: string[];
    enchants?: {
        [key: string]: number;
    };
    potion_type?: string;
    potion_upgraded?: boolean;
    potion_extended?: boolean;
    firework_effects?: FireworkEffectInterface[];
    firework_duration?: number;
    armor_color?: string;
    fish_body_color?: string;
    fish_pattern_type?: FishPatternType;
    fish_pattern_color?: string;
    banner_patterns?: BannerPatternInterface[];
    book_title?: string;
    book_author?: string;
    book_generation?: string;
}
