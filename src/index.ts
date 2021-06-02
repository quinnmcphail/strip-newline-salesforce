import { Transform } from "stream";
import * as PluginError from "plugin-error";
import * as Vinyl from "vinyl";

/**
 * Remove newline character from the end of a Vinyl file.
 * @param {Vinyl} file - Gulp Vinyl object
 * @returns {void} - `void`
 */
export function removeNewlineFromFile(file: Vinyl): void {
  let str = file.contents != null ? file.contents.toString("utf8") : "";
  str = str.replace(/(\r?\n)+$/g, "");
  file.contents = Buffer.from(str);
}

/**
 * Gulp plugin to hook up to the `removeNewlineFromFile()` function
 * @returns {NewlineTransform} - `NewlineTransform` stream
 */
export function removeNewlineFromGulpProcess(): NewlineTransform {
  return new NewlineTransform();
}

/**
 * @class Custom `Transform` stream
 * @extends Transform
 */
class NewlineTransform extends Transform {
  constructor() {
    // Call `Transform` constructor, set readable and writable streams to object mode
    super({ writableObjectMode: true, readableObjectMode: true });
  }

  /**
   * Transform function overload
   *
   * @param chunk Stream data chunk
   * @param _enc Encoding
   * @param done Callback
   * @returns `void`
   */
  // Disable eslint rule to comply with Node documentation on Transform streams: https://nodejs.org/api/stream.html#stream_transform_transform_chunk_encoding_callback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _transform(chunk: any, _enc: string, done: () => void) {
    if (chunk.isNull()) {
      return done();
    }

    if (chunk.isStream()) {
      this.emit(
        "error",
        new PluginError("strip-newline-salesforce", "Streaming not supported")
      );
      return done();
    }

    if (chunk.isBuffer()) {
      try {
        removeNewlineFromFile(chunk);
      } catch (e) {
        this.emit("error", e);
      }
    }

    this.push(chunk);
    done();
  }
}
