import sys, math, subprocess, array

width, height = 1920, 1080
fps = 30
duration = 15 # 15 seconds loop
total_frames = fps * duration

output_path = "public/videos/hero-cinematic.mp4"

print(f"Generating {width}x{height} @ {fps}fps, {duration}s loop ({total_frames} frames)...")

cmd = [
    'ffmpeg', '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{width}x{height}',
    '-pix_fmt', 'rgb24',
    '-r', str(fps),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '19',
    '-movflags', '+faststart',
    output_path
]

proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

# Define 36 AI network nodes in 3D space with deterministic seamless trigonometric trajectories
import random
random.seed(42)

nodes = []
for i in range(36):
    # Base center
    cx = random.uniform(200, width - 200)
    cy = random.uniform(150, height - 150)
    # Radii for sinusoidal loop
    rx = random.uniform(40, 140)
    ry = random.uniform(30, 100)
    # Frequencies (integer multipliers for 100% seamless period)
    freq_x = random.choice([1, 2, 3])
    freq_y = random.choice([1, 2, 3])
    phase_x = random.uniform(0, 2 * math.pi)
    phase_y = random.uniform(0, 2 * math.pi)
    # Color: primary gold #E5C158 (229,193,88) or warm amber (212,175,55) or subtle ice (200,220,255)
    ctype = random.choice(['gold', 'gold', 'gold', 'amber', 'ice'])
    if ctype == 'gold':
        col = (229, 193, 88)
    elif ctype == 'amber':
        col = (212, 160, 50)
    else:
        col = (180, 210, 240)
    size = random.uniform(2.5, 4.5)
    nodes.append({
        'cx': cx, 'cy': cy, 'rx': rx, 'ry': ry,
        'fx': freq_x, 'fy': freq_y,
        'px': phase_x, 'py': phase_y,
        'color': col, 'size': size
    })

# Precompute vignette map (downsampled grid for fast interpolation)
grid_step = 8
gw, gh = (width + grid_step - 1) // grid_step, (height + grid_step - 1) // grid_step
vignette_grid = []
half_w, half_h = width / 2.0, height / 2.0
max_dist_sq = half_w*half_w + half_h*half_h

for gy in range(gh):
    row = []
    y = gy * grid_step
    dy = y - half_h
    for gx in range(gw):
        x = gx * grid_step
        dx = x - half_w
        dist_norm = (dx*dx + dy*dy) / max_dist_sq
        vig = max(0.2, 1.0 - 0.7 * (dist_norm ** 1.1))
        row.append(vig)
    vignette_grid.append(row)

# Fast frame rendering loop
for frame_idx in range(total_frames):
    t_fraction = frame_idx / total_frames
    angle = 2.0 * math.pi * t_fraction

    # Calculate current position of each node
    curr_nodes = []
    for node in nodes:
        nx = node['cx'] + node['rx'] * math.sin(node['fx'] * angle + node['px'])
        ny = node['cy'] + node['ry'] * math.cos(node['fy'] * angle + node['py'])
        curr_nodes.append((nx, ny, node['color'], node['size']))

    # Ambient light orbs positions
    orb1_x = width * 0.35 + 180 * math.sin(angle)
    orb1_y = height * 0.4 + 120 * math.cos(2 * angle)
    
    orb2_x = width * 0.65 + 200 * math.cos(angle)
    orb2_y = height * 0.6 + 100 * math.sin(2 * angle)

    # Prepare RGB frame array initialized to dark charcoal #050507
    # We render directly into bytearray for maximum speed
    frame_bytes = bytearray(width * height * 3)
    
    # Fill background with dark charcoal + subtle ambient gold light + vignette
    for y in range(height):
        gy = y // grid_step
        y_blend = (y % grid_step) / grid_step
        dy1 = y - orb1_y
        dy2 = y - orb2_y
        row_offset = y * width * 3

        for x in range(width):
            gx = x // grid_step
            x_blend = (x % grid_step) / grid_step

            # Bilinear interpolation of vignette
            v00 = vignette_grid[gy][gx]
            v10 = vignette_grid[gy][min(gx+1, gw-1)]
            v01 = vignette_grid[min(gy+1, gh-1)][gx]
            v11 = vignette_grid[min(gy+1, gh-1)][min(gx+1, gw-1)]
            vig = (v00 * (1 - x_blend) + v10 * x_blend) * (1 - y_blend) + (v01 * (1 - x_blend) + v11 * x_blend) * y_blend

            # Base charcoal #050507
            r = 5.0
            g = 5.0
            b = 7.0

            # Ambient orb 1 (warm gold glow #E5C158)
            dx1 = x - orb1_x
            d1_sq = dx1*dx1 + dy1*dy1
            if d1_sq < 360000: # radius ~ 600px
                glow1 = math.exp(-d1_sq / 120000.0) * 0.18
                r += 229 * glow1
                g += 193 * glow1
                b += 88 * glow1

            # Ambient orb 2 (deep gold glow #D4AF37)
            dx2 = x - orb2_x
            d2_sq = dx2*dx2 + dy2*dy2
            if d2_sq < 360000:
                glow2 = math.exp(-d2_sq / 120000.0) * 0.14
                r += 212 * glow2
                g += 175 * glow2
                b += 55 * glow2

            # Apply vignette
            r = min(255, int(r * vig))
            g = min(255, int(g * vig))
            b = min(255, int(b * vig))

            idx = row_offset + x * 3
            frame_bytes[idx] = r
            frame_bytes[idx+1] = g
            frame_bytes[idx+2] = b

    # Draw connection lines between nearby nodes
    for i in range(len(curr_nodes)):
        x1, y1, c1, _ = curr_nodes[i]
        for j in range(i + 1, len(curr_nodes)):
            x2, y2, c2, _ = curr_nodes[j]
            dx = x2 - x1
            dy = y2 - y1
            dist_sq = dx*dx + dy*dy
            if dist_sq < 32400: # < 180px distance
                dist = math.sqrt(dist_sq)
                alpha = (1.0 - dist / 180.0) * 0.35 # subtle line opacity
                # Bresenham line rendering
                steps = int(max(abs(dx), abs(dy)))
                if steps > 0:
                    for s in range(0, steps, 2): # step by 2px for speed
                        lx = int(x1 + dx * (s / steps))
                        ly = int(y1 + dy * (s / steps))
                        if 0 <= lx < width and 0 <= ly < height:
                            idx = (ly * width + lx) * 3
                            # Blend line color (warm gold)
                            lr = int(frame_bytes[idx] * (1 - alpha) + 229 * alpha)
                            lg = int(frame_bytes[idx+1] * (1 - alpha) + 193 * alpha)
                            lb = int(frame_bytes[idx+2] * (1 - alpha) + 88 * alpha)
                            frame_bytes[idx] = min(255, lr)
                            frame_bytes[idx+1] = min(255, lg)
                            frame_bytes[idx+2] = min(255, lb)

    # Draw node particles with glow
    for x, y, col, size in curr_nodes:
        ix, iy = int(x), int(y)
        r_int = int(size + 2)
        cr, cg, cb = col
        for py in range(max(0, iy - r_int), min(height, iy + r_int + 1)):
            dy = py - y
            for px in range(max(0, ix - r_int), min(width, ix + r_int + 1)):
                dx = px - x
                d_sq = dx*dx + dy*dy
                if d_sq <= (size * size * 2.5):
                    intensity = math.exp(-d_sq / (size * 1.2))
                    if intensity > 0.05:
                        idx = (py * width + px) * 3
                        nr = int(frame_bytes[idx] * (1 - intensity) + cr * intensity)
                        ng = int(frame_bytes[idx+1] * (1 - intensity) + cg * intensity)
                        nb = int(frame_bytes[idx+2] * (1 - intensity) + cb * intensity)
                        frame_bytes[idx] = min(255, nr)
                        frame_bytes[idx+1] = min(255, ng)
                        frame_bytes[idx+2] = min(255, nb)

    proc.stdin.write(frame_bytes)

    if (frame_idx + 1) % 45 == 0 or frame_idx == total_frames - 1:
        print(f"Rendered {frame_idx + 1}/{total_frames} frames ({int((frame_idx+1)/total_frames*100)}%)...")

proc.stdin.close()
proc.wait()
print("Video generation completed with exit code:", proc.returncode)
