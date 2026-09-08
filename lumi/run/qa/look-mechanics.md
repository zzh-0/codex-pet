# Lumi look mechanics

Lumi is a humanoid assistant with a stable grounded lower body. Keep feet, skirt hem, hoodie volume, and backpack anchor registered while the gaze leads. The blue eyes and eyelids change first, then the head and neck turn subtly; long white hair follows with a soft lag. The backpack remains worn and mostly body-locked, with straps and loose charms following the torso rather than swinging independently.

Cardinal pose families in viewer coordinates:

- 000 up: eyes and chin angle upward, lower face stays centered, hair lifts slightly at the crown.
- 090 screen-right: nose and pupils shift right of head center, right cheek becomes more visible, left cheek and far eye are partly occluded; backpack stays on the rear-left silhouette.
- 180 down: eyelids lower and gaze drops, chin tucks slightly, bangs cover more of the upper eyes.
- 270 screen-left: nose and pupils shift left of head center, left cheek becomes more visible, right cheek and far eye are partly occluded; backpack remains behind the torso on the rear-right silhouette.

Intermediate directions interpolate evenly through eye direction, eyelid shape, head turn, neck follow-through, and hair overlap. Do not rotate the whole sprite or slide only pupils over a fixed eye white. Preserve the original large blue eye construction and facial proportions. Motion budget is small and even per 22.5-degree step; feet and lower-body baseline remain fixed.
