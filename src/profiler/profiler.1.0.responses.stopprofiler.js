﻿// Autogenerated by hob
window.cls || (window.cls = {});
cls.Profiler || (cls.Profiler = {});
cls.Profiler["1.0"] || (cls.Profiler["1.0"] = {});

cls.Profiler["1.0"].Session = function(arr, parent)
{
  this.parent = parent || null;
  /**
    *
    *  Non-zero ID for the `Session`. This must be used when accessing `Events`
    *  from a `Timeline` within the `Session`, and when releasing the
    *  `Session`.
    */
  this.sessionID = arr[0];
  /**
    *
    *  The ID of the window associated with a `Session`.
    *
    *  This field may not be present if the `Session` is not associated with a
    *  window. (Currently not applicable, but field is made optional for
    *  future compatibility).
    */
  this.windowID = arr[1];
  /**
    *
    *  `Timelines` contained within the `Session`. This will typically contain
    *  one `Timeline` for each frame that existed in the window at some point
    *  during profiling.
    */
  var self = this;
  this.timelineList = (arr[2] || []).map(function(item)
  {
    return new cls.Profiler["1.0"].Timeline(item, self);
  });
  this.toString = function() { return "[message Session]"; }
};

cls.Profiler["1.0"].Timeline = function(arr, parent)
{
  this.parent = parent || null;
  /**
    *
    *  Non-zero ID for the `Timeline`. This must be used when accessing `Events`
    *  from the `Timeline`.
    */
  this.timelineID = arr[0];
  /**
    *
    *  If the `Timeline` is associated with a frame, the ID of the frame will be
    *  stored here. If the frame was removed during profiling, it will not be
    *  possible to access additional information about the frame from
    *  'DocumentManager'.
    *
    *  Also, this field may not be present if the `Timeline` is not associated
    *  with a frame. (Currently not applicable, but field is made optional for
    *  future compatibility).
    */
  this.frameID = arr[1];
  this.toString = function() { return "[message Timeline]"; }
};
